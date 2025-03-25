import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import errorReducer from '../features/error/errorSlice';
import infoReducer from '../features/info/infoSlice';
import socketReducer from "../features/socket/socketSlice";
import maintenanceReducer from "../features/maintenance/maintenanceSlice";
import gameReducer from "../features/game/gameSlice";

/**
 * The Redux store is configured with the following reducers:
 * - `user`: Manages user-related state.
 * - `error`: Handles application error states.
 * - `info`: Stores informational messages or data.
 * - `socket`: Manages WebSocket connections and related state.
 * - `maintenance`: Tracks maintenance mode or related settings.
 * - `game`: Handles game-related state and logic.
 *
 * Middleware:
 * - Default middleware is used with `serializableCheck` disabled to allow non-serializable data in the state.
 */
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

/**
 * Type for the root state of the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Type for the dispatch function of the Redux store.
 */
export type AppDispatch = typeof store.dispatch;
