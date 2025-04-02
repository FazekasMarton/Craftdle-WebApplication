import { io, Socket } from "socket.io-client";
import { store } from "../app/store";
import { setSocket } from "../features/socket/socketSlice";

/**
 * Function to connect to the socket server.
 * 
 * This function disconnects any existing socket connection and establishes a new
 * connection using the user's login token. The new socket instance is stored in
 * the Redux store.
 */
export function connectSocket() {
    const currentSocket = store.getState().socket.socket;
    currentSocket?.off("disconnect");
    currentSocket?.disconnect()
    const token = store.getState().user.loginToken;
    const socket: Socket = io(import.meta.env.VITE_SERVER_URL, {
        auth: {
            token: token
        }
    });
    store.dispatch(setSocket(socket));
}