import type { TProblem } from "../../problems/form/problem.helper";

export type TDifficulty = "easy" | "medium" | "hard";
export type TSessionStatus = "scheduled" | "active" | "completed";

export interface ISession {
	_id: string;
	problem: TProblem;
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
