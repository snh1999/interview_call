import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
	baseUrl: `${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/api`,
	credentials: "include",
});

const baseQueryWithTransform: typeof rawBaseQuery = async (
	args,
	api,
	extraOptions,
) => {
	const result = await rawBaseQuery(args, api, extraOptions);

	if (result.data !== undefined) {
		return {
			...result,
			data: (result.data as { data?: unknown }).data ?? result.data,
		};
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithTransform,
	tagTypes: ["User"],
	endpoints: () => ({}),
});

export const AUTH_URL = "/auth";
