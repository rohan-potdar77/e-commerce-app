import { createSlice } from '@reduxjs/toolkit';

interface Loading {
    isLoading: boolean;
}

const initialState: Loading = { isLoading: false };

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        stopLoading: state => {
            state.isLoading = false;
        },
    },
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
