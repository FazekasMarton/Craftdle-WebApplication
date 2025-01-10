import { io, Socket } from "socket.io-client";
import { store } from "../app/store";

export function connectSocket(socket: Socket | null) {
    const token = store.getState().user.loginToken;
    socket = io("http://localhost:3000", {
        auth: {
            token: token
        }
    });
}