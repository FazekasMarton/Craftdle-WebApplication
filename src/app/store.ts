import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import errorReducer from '../features/error/errorSlice';
import infoReducer from '../features/info/infoSlice';
import socketReducer from "../features/socket/socketSlice";
import maintenanceReducer from "../features/maintenance/maintenanceSlice";
import gameReducer from "../features/game/gameSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        error: errorReducer,
        info: infoReducer,
        socket: socketReducer,
        maintenance: maintenanceReducer,
        game: gameReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
