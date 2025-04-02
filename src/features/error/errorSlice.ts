import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface for the error state.
 */
interface ErrorState {
    status: number;
    name: string;
    message: string;
}

// Initial state for the error slice
const initialState: ErrorState = {
    status: 200,
    name: 'OK',
    message: 'Everything is working fine.',
};

// Create the error slice
const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        /**
         * Set the error state based on the error name.
         * @param state - The current state.
         * @param action - The action containing the error name.
         */
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
                case 'LoadingError':
                    state.status = 404;
                    state.name = "Not Found";
                    state.message = "Failed to load the requested resource. Please try again later.";
                    break;
                case 'ConnectionError':
                    state.status = 1006;
                    state.name = "Connection Lost";
                    state.message = "Lost connection to the server. Please try again later.";
                    break;
                case 'UnauthorizedError':
                    state.status = 401;
                    state.name = "Unauthorized";
                    state.message = "Your token has expired, or another device is using your account. Please log in again.";
                    break;
                case 'SessionTakeover':
                    state.status = 4008;
                    state.name = "Concurrent Login Conflict";
                    state.message = "Connection closed due to another device taking over the session. Please log in again.";
                    break;
                default:
                    state.status = 500;
                    state.name = "Internal Server Error";
                    state.message = "Something went wrong on our end. Please try again later.";
                    break;
            }
        },       
        /**
         * Reset the error state to the default values.
         * @param state - The current state.
         */
        resetError: (state) => {
            Object.assign(state, initialState)
        },
    },
});

// Export the actions and reducer
export const { setError, resetError } = errorSlice.actions;
export default errorSlice.reducer;