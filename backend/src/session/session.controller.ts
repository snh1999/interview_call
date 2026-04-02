import { Types } from "mongoose";
import { createController } from "#lib/http-wrapper/request";
import { SendResponse } from "#lib/http-wrapper/response";
import { chatClient, streamVideoClient } from "#lib/stream";
import { User } from "#user/User.model";
import { Session } from "./Session.model.js";
import type {
	TCreateSessionDTO,
	TSessionParams,
	TUpdateSessionDTO,
} from "./session.dto.js";

const createSession = createController(async (req) => {
	const { problem, difficulty, email } = req.body as TCreateSessionDTO;
	const host = req.user._id.toString();

	let participant: string | null = null;

	if (email) {
		const participantUser = await User.findOne({ email });
		if (!participantUser) {
			return SendResponse.error(
				"NOT_FOUND",
				"No user found with the email",
				404,
			);
		}

		if (participantUser._id.toString() === host) {
			return SendResponse.error("BAD_REQUEST", "Cannot invite yourself", 400);
		}
		participant = participantUser._id.toString();
	}

	const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
	const session = await Session.create({
		problem,
		difficulty,
		host,
		callId,
		participant,
	});

	await streamVideoClient.video.call("default", callId).getOrCreate({
		data: {
			created_by_id: host,
			custom: { problem, difficulty, sessionId: session._id.toString() },
		},
	});

	await chatClient
		.channel("messaging", callId, {
			created_by_id: host,
			members: [host, ...(participant ? [participant] : [])],
		})
		.create();

	return SendResponse.ok({ session });
});

const getActiveSessions = createController(async (req) => {
	const userId = req.user._id;
	const sessions = await Session.find({
		$and: [
			{ $or: [{ status: "active" }, { status: "scheduled" }] },
			{ $or: [{ host: userId }, { participant: userId }] },
		],
	})
		.populate("host", "name email")
		.sort({ createdAt: -1 })
		.limit(10);

	return SendResponse.ok({ sessions });
});

const getScheduledSessions = createController(async () => {
	const sessions = await Session.find({ status: "scheduled" })
		.populate("host", "name email")
		.sort({ createdAt: -1 })
		.limit(10);

	return SendResponse.ok({ sessions });
});

const getRecentSessions = createController(async (req) => {
	const userId = req.user._id;
	const sessions = await Session.find({
		status: "completed",
		$or: [{ host: userId }, { participant: userId }],
	})
		.sort({ createdAt: -1 })
		.limit(10);

	return SendResponse.ok({ sessions });
});

const getSessionById = createController(async (req) => {
	const { id } = req.params as TSessionParams;
	const session = await Session.findById(id)
		.populate("problem")
		.populate("host", "name email")
		.populate("participant", "name email");

	if (!session)
		return SendResponse.error("NOT_FOUND", "Session not found", 404);

	return SendResponse.ok({ session });
});

const joinSession = createController(async (req) => {
	const { id } = req.params as TSessionParams;
	const userId = req.user._id;
	const session = await Session.findById(id);
	if (!session) {
		return SendResponse.error("NOT_FOUND", "Session not found", 404);
	}

	if (session.participant && session.participant !== userId) {
		return SendResponse.error("BAD_REQUEST", "Session is already full", 400);
	}

	if (session.host.toString() === userId.toString()) {
		return SendResponse.error(
			"BAD_REQUEST",
			"You are the host of the session",
			400,
		);
	}

	if (session.status === "completed") {
		return SendResponse.error("BAD_REQUEST", "Session already completed", 400);
	}

	const user = await User.findById(userId);
	if (!user) {
		return SendResponse.error("NOT_FOUND", "User not found", 404);
	}

	const invitedSession = await Session.findOne({
		_id: id,
		participant: userId,
	});

	if (!invitedSession) {
		return SendResponse.error(
			"FORBIDDEN",
			"You are not invited to this session",
			403,
		);
	}

	session.participant = userId;
	await session.save();

	const channel = chatClient.channel("messaging", session.callId);
	await channel.addMembers([userId.toString()]);

	return SendResponse.ok({ session }, "Joined successfully");
});

const endSession = createController(async (req) => {
	const { id } = req.params as TSessionParams;
	const userId = req.user._id;
	const session = await Session.findById(id);
	if (!session)
		return SendResponse.error("NOT_FOUND", "Session not found", 404);

	if (session.host.toString() !== userId.toString()) {
		return SendResponse.error(
			"UNAUTHORIZED",
			"Only host can end the session",
			403,
		);
	}

	if (session.status === "completed") {
		return SendResponse.error("BAD_REQUEST", "Session has already ended", 400);
	}

	const call = streamVideoClient.video.call("default", session.callId);
	await call.delete({ hard: true });

	const chat = chatClient.channel("messaging", session.callId);
	await chat.delete();

	session.status = "completed";
	await session.save();

	return SendResponse.ok({ session }, "Session ended successfully");
});

const getStreamToken = createController((req) => {
	const token = chatClient.createToken(req.user._id.toString());

	return SendResponse.ok({
		token,
		userId: req.user._id,
		name: req.user.name,
	});
});

const updateSession = createController(async (req) => {
	const { id } = req.params as TSessionParams;
	const { problem, difficulty, email } = req.body as TUpdateSessionDTO;
	const userId = req.user._id.toString();

	const session = await Session.findById(id);
	if (!session) {
		return SendResponse.error("NOT_FOUND", "Session not found", 404);
	}

	if (session.host.toString() !== userId) {
		return SendResponse.error("FORBIDDEN", "Only host can update session", 403);
	}

	if (session.status === "completed") {
		return SendResponse.error("BAD_REQUEST", "Session already completed", 400);
	}

	if (email) {
		if (session.participant) {
			return SendResponse.error(
				"BAD_REQUEST",
				"Session already has a participant",
				400,
			);
		}

		const participantUser = await User.findOne({ email });
		if (!participantUser) {
			return SendResponse.error("NOT_FOUND", "User not found", 404);
		}
		if (participantUser._id.toString() === userId) {
			return SendResponse.error("BAD_REQUEST", "Cannot invite yourself", 400);
		}

		session.participant = participantUser._id;

		const channel = chatClient.channel("messaging", session.callId);
		await channel.addMembers([participantUser._id.toString()]);
	}

	if (problem) session.problem = Types.ObjectId.createFromHexString(problem);
	if (difficulty) session.difficulty = difficulty;

	await session.save();
	await session.populate("problem");
	await session.populate("host", "name email");
	await session.populate("participant", "name email");

	return SendResponse.ok({ session });
});

export const SessionController = {
	createSession,
	getActiveSessions,
	getScheduledSessions,
	getRecentSessions,
	getSessionById,
	joinSession,
	endSession,
	getStreamToken,
	updateSession,
};
