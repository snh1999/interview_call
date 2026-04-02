import type { TProblem } from "../../problems/form/problem.helper";
import { apiSlice } from "./apiSlice";

export const PROBLEM_URL = "/problem";

export const problemApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createProblem: builder.mutation({
			query: (data) => ({
				url: PROBLEM_URL,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Problems"],
		}),
		updateProblem: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `${PROBLEM_URL}/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: (_result, _error, { id }) => [
				{ type: "Problems", id },
				"Problems",
			],
		}),
		deleteProblem: builder.mutation({
			query: (id) => ({
				url: `${PROBLEM_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Problems"],
		}),
		getAllProblems: builder.query<{ problems: TProblem[] }, void>({
			query: () => PROBLEM_URL,
			providesTags: ["Problems"],
		}),
		getProblemById: builder.query<{ problem: TProblem }, string | undefined>({
			query: (id) => `${PROBLEM_URL}/${id}`,
			providesTags: (_result, _error, id) => [{ type: "Problems", id }],
		}),
	}),
});

export const {
	useCreateProblemMutation,
	useUpdateProblemMutation,
	useDeleteProblemMutation,
	useGetAllProblemsQuery,
	useGetProblemByIdQuery,
} = problemApiSlice;
