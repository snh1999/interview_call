import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ExecutionResult {
	success: boolean;
	output?: string;
	error?: string;
}

interface IProblemState {
	output: ExecutionResult | null;
}

const initialState: IProblemState = {
	output: null,
};

const problemSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setOutput: (state, action: PayloadAction<ExecutionResult | null>) => {
			state.output = action.payload;
		},

		resetOutput: (state) => {
			state.output = null;
		},
	},
});

export const { setOutput, resetOutput } = problemSlice.actions;
export default problemSlice.reducer;
