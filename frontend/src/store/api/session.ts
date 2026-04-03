import type {
  TCreateSession,
  TUpdateSession,
} from "../../session/session.helper";
import type { ISession } from "./api.types";
import { apiSlice } from "./apiSlice";

export const SESSION_URL = "/session";

export const sessionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSession: builder.mutation<{ session: ISession }, TCreateSession>({
      query: (data) => ({
        url: SESSION_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sessions"],
    }),

    getActiveSessions: builder.query<{ sessions: ISession[] }, void>({
      query: () => `${SESSION_URL}/active`,
      providesTags: ["Sessions"],
    }),

    getScheduledSessions: builder.query<{ sessions: ISession[] }, void>({
      query: () => `${SESSION_URL}/scheduled`,
      providesTags: ["Sessions"],
    }),

    getRecentSessions: builder.query<{ sessions: ISession[] }, void>({
      query: () => `${SESSION_URL}/recent`,
      providesTags: ["Sessions"],
    }),

    getSessionById: builder.query<{ session: ISession }, string | undefined>({
      query: (id) => `${SESSION_URL}/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Sessions", id }],
    }),

    joinSession: builder.mutation<{ session: ISession }, string>({
      query: (id) => ({
        url: `${SESSION_URL}/${id}/join`,
        method: "POST",
      }),
      invalidatesTags: ["Sessions"],
    }),

    endSession: builder.mutation<{ session: ISession }, string>({
      query: (id) => ({
        url: `${SESSION_URL}/${id}/end`,
        method: "POST",
      }),
      invalidatesTags: ["Sessions"],
    }),

    updateSession: builder.mutation<ISession, TUpdateSession>({
      query: ({ id, ...data }) => ({
        url: `${SESSION_URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    getSessionToken: builder.query<
      { token: string; userId: string; name: string },
      void
    >({
      query: () => `${SESSION_URL}/chat`,
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
  useGetSessionTokenQuery,
  useUpdateSessionMutation,
} = sessionApiSlice;
