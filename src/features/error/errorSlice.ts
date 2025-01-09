import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
    status: number;
    name: string;
    message: string;
}

const initialState: ErrorState = {
    status: 200,
    name: 'OK',
    message: 'Everything is working fine.',
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            const errorName = action.payload;
            switch (errorName) {
                case 'TypeError':
                    state.status = 503;
                    state.name = "Service Unavailable";
                    state.message = "Failed to connect to the server. Please try again later.";
                    break;
                case 'SyntaxError':
                    state.status = 400;
                    state.name = "Bad Request";
                    state.message = "There was an issue processing the server's response. Please try again later.";
                    break;
                default:
                    state.status = 500;
                    state.name = "Internal Server Error";
                    state.message = "Something went wrong on our end. Please try again later.";
                    break;
            }
        },       
        resetError: (state) => {
            state.status = 200;
            state.name = "OK";
            state.message = "Everything is working fine.";
        },
    },
});

export const { setError, resetError } = errorSlice.actions;

export default errorSlice.reducer;