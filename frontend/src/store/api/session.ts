import type { ICreateSessionInput, ISession } from "./api.types";
import { apiSlice } from "./apiSlice";

export const SESSION_URL = "/session";

export const sessionApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createSession: builder.mutation<{ session: ISession }, ICreateSessionInput>(
			{
				query: (data) => ({
					url: SESSION_URL,
					method: "POST",
					body: data,
				}),
			},
		),

		getActiveSessions: builder.query<{ sessions: ISession[] }, void>({
			query: () => `${SESSION_URL}/active`,
		}),

		getScheduledSessions: builder.query<{ sessions: ISession[] }, void>({
			query: () => `${SESSION_URL}/scheduled`,
		}),

		getRecentSessions: builder.query<{ sessions: ISession[] }, void>({
			query: () => `${SESSION_URL}/recent`,
		}),

		getSessionById: builder.query<{ session: ISession }, string>({
			query: (id) => `${SESSION_URL}/${id}`,
		}),

		joinSession: builder.mutation<{ session: ISession }, string>({
			query: (id) => ({
				url: `${SESSION_URL}/${id}/join`,
				method: "POST",
			}),
		}),

		endSession: builder.mutation<{ session: ISession }, string>({
			query: (id) => ({
				url: `${SESSION_URL}/${id}/end`,
				method: "POST",
			}),
		}),
	}),
});

export const {
	useCreateSessionMutation,
	useGetActiveSessionsQuery,
	useGetScheduledSessionsQuery,
	useGetRecentSessionsQuery,
	useGetSessionByIdQuery,
	useJoinSessionMutation,
	useEndSessionMutation,
} = sessionApiSlice;
