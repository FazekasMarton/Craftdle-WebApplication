import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import errorReducer from '../features/error/errorSlice';
import infoReducer from '../features/info/infoSlice';
import socketReducer from "../features/socket/socketSlice";
import maintenanceReducer from "../features/maintenance/maintenanceSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        error: errorReducer,
        info: infoReducer,
        socket: socketReducer,
        maintenance: maintenanceReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
