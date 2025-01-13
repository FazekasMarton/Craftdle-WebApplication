import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { WritableDraft } from "immer";

interface SocketState {
    socket: Socket | null;
}

const initialState: SocketState = {
    socket: null
};

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocket(state, action: PayloadAction<Socket | null>) {
            state.socket = action.payload as WritableDraft<Socket> | null;
        },
    }
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;