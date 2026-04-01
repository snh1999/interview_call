import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./slices/authSlice";
import problemReducer from "./slices/problemSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		problem: problemReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (defaultMiddleware) =>
		defaultMiddleware().concat(apiSlice.middleware),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
