import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { WritableDraft } from "immer";

/**
 * Interface for the socket state.
 */
interface SocketState {
    socket: Socket | null;
}

// Initial state for the socket slice
const initialState: SocketState = {
    socket: null
};

// Create the socket slice
const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        /**
         * Set the socket instance.
         * @param state - The current state.
         * @param action - The action containing the socket instance or null.
         */
        setSocket(state, action: PayloadAction<Socket | null>) {
            state.socket = action.payload as WritableDraft<Socket> | null;
        },
    }
});

// Export the actions and reducer
export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;