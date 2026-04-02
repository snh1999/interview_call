export type TDifficulty = "easy" | "medium" | "hard";
export type TSessionStatus = "scheduled" | "active" | "completed";

export interface ISession {
	_id: string;
	problem: string;
	difficulty: TDifficulty;
	host: {
		_id: string;
		name: string;
		email: string;
	};
	participant: {
		_id: string;
		name: string;
		email: string;
	} | null;
	status: TSessionStatus;
	callId: string;
	createdAt: string;
	updatedAt: string;
}

export interface ICreateSessionInput {
	problem: string;
	difficulty: TDifficulty;
}
