import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: `${import.meta.env.VITE_API_URL ?? "http://localhost:3000"}/api`,
		credentials: "include",
	}),
	tagTypes: ["User"],
	endpoints: () => ({}),
});

export const AUTH_URL = "/auth";
