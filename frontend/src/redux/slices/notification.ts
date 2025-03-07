import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SeverityProps } from '../../shared/constants';

interface Notification {
	show: boolean;
	message: string | null | undefined;
	severity: SeverityProps;
}

const initialState: Notification = {
	show: false,
	message: null,
	severity: 'info',
};

const notification = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification: (
			state,
			action: PayloadAction<Omit<Notification, 'show'>>
		) => {
			state.show = true;
			state.message = action.payload.message;
			state.severity = action.payload.severity;
		},
		clearNotification: state => {
			state.show = initialState.show;
			state.message = initialState.message;
			state.severity = initialState.severity;
		},
	},
});

export const { setNotification, clearNotification } = notification.actions;

export default notification.reducer;
