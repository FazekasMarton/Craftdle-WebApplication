import { io, Socket } from "socket.io-client";
import { store } from "../app/store";
import { setSocket } from "../features/socket/socketSlice";

export function connectSocket() {
    const token = store.getState().user.loginToken;
    const socket: Socket = io("http://localhost:3000", {
        auth: {
            token: token
        }
    });
    store.dispatch(setSocket(socket));
}