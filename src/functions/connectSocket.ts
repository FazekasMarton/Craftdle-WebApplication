import { io, Socket } from "socket.io-client";
import { store } from "../app/store";
import { setSocket } from "../features/socket/socketSlice";

/**
 * Function to connect to the socket server.
 */
export function connectSocket() {
    store.getState().socket.socket?.disconnect()
    const token = store.getState().user.loginToken;
    const socket: Socket = io("http://localhost:3000", {
        auth: {
            token: token
        }
    });
    store.dispatch(setSocket(socket));
}