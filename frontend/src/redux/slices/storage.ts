import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Storage {
	userType: string | null;
	isValid: boolean;
}

const initialState: Storage = {
	userType: null,
	isValid: false,
};

const storage = createSlice({
	name: 'storage',
	initialState,
	reducers: {
		validateUser: (state, action: PayloadAction<string>) => {
			state.userType = action.payload;
			state.isValid = true;
		},
		inValidateUser: state => {
			state.isValid = false;
			state.userType = null;
		},
	},
});

export const { validateUser, inValidateUser } = storage.actions;

export default storage.reducer;
