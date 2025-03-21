import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { setError } from "../error/errorSlice";
import { ISettings } from "../../interfaces/ISettings";

/**
 * Function to handle communication with the server.
 * @param state - The current state.
 * @param dispatch - The dispatch function.
 * @param url - The URL to communicate with.
 * @param method - The HTTP method to use.
 * @param auth - The authentication type.
 * @param body - The request body.
 * @param disableError - If error pop up disabled.
 * @returns The response data and status.
 */
export async function communicate(
    state: RootState,
    dispatch: Function,
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    auth?: "Basic" | "Bearer" | null,
    body?: object,
    disableError?: boolean
) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json"
    };

    if (auth) {
        headers["Authorization"] =
            auth === "Basic"
                ? `Basic ${btoa(`${state.user.username}:${state.user.loginToken}`)}`
                : `Bearer ${state.user.loginToken}`;
    }

    const options: RequestInit = {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if(response.status === 401 && !disableError) {
            const error = new Error("UnauthorizedError");
            error.name = "UnauthorizedError";
            throw error;
        }
        return { data: data, response: response.ok };
    } catch (err: any) {
        if(!disableError) {
            dispatch(setError(err.name));
        }
    }
}

// Define async thunks for various user actions
/**
 * Register a new user.
 * @param username - The username of the user.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @param stayLoggedIn - Whether the user should stay logged in.
 */
export const register = createAsyncThunk(
    "user/register",
    async (
        { username, email, password, stayLoggedIn }:
            { username: string; email: string; password: string; stayLoggedIn: boolean },
        { dispatch, getState }
    ) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            `${import.meta.env.VITE_SERVER_URL}/users/register`,
            "POST",
            null,
            {
                username: username,
                email: email,
                password: password,
                stayLoggedIn: stayLoggedIn,
            },
            true
        );

        return response;
    }
);

/**
 * Log in as a guest user.
 */
export const guestLogin = createAsyncThunk(
    "user/guestLogin",
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            `${import.meta.env.VITE_SERVER_URL}/users/login`,
            "GET"
        );

        return response;
    }
);

/**
 * Log in using a token.
 */
export const tokenLogin = createAsyncThunk(
    "user/tokenLogin",
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            `${import.meta.env.VITE_SERVER_URL}/users/login`,
            "POST",
            "Bearer",
            {},
            true
        );

        return response;
    }
);

/**
 * Log in with username or email and password.
 * @param usernameOrEmail - The username or email of the user.
 * @param password - The password of the user.
 * @param stayLoggedIn - Whether the user should stay logged in.
 */
export const login = createAsyncThunk(
    "user/login",
    async ({ usernameOrEmail, password, stayLoggedIn }:
        { usernameOrEmail: string; password: string; stayLoggedIn: boolean },
        { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            `${import.meta.env.VITE_SERVER_URL}/users/login`,
            "POST",
            undefined,
            { usernameOrEmail, password, stayLoggedIn },
            true
        );

        return response;
    }
);

/**
 * Log out the current user.
 */
export const logout = createAsyncThunk(
    "user/logout",
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            `${import.meta.env.VITE_SERVER_URL}/users/login`,
            "DELETE",
            "Basic"
        );

        return response;
    }
);

/**
 * Request a password reset email.
 * @param email - The email address to send the reset link to.
 */
export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (email: string, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            `${import.meta.env.VITE_SERVER_URL}/users/password`,
            "POST",
            "Bearer",
            { email: email }
        );

        return response;
    }
);

/**
 * Change the user's password using a token.
 * @param password - The new password.
 * @param token - The reset token.
 */
export const changePassword = createAsyncThunk(
    "user/changePassword",
    async ({ password, token }:
        { password: string; token: string },
        { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            `${import.meta.env.VITE_SERVER_URL}/users/password`,
            "PUT",
            "Bearer",
            {
                password: password,
                token: token
            }
        );

        return response;
    }
);

/**
 * Fetch the user's settings.
 */
export const getSettings = createAsyncThunk(
    "user/getSettings",
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            `${import.meta.env.VITE_SERVER_URL}/users/settings`,
            "GET",
            "Bearer"
        );

        return response;
    }
);

/**
 * Update the user's settings.
 * @param settings - The updated settings object.
 */
export const changeSettings = createAsyncThunk(
    "user/changeSettings",
    async (settings: ISettings, { dispatch, getState }) => {
        const state = getState() as RootState;

        const { id, ...changedSettings } = settings
        const response = await communicate(
            state,
            dispatch,
            `${import.meta.env.VITE_SERVER_URL}/users/settings/${id}`,
            "PUT",
            "Bearer",
            changedSettings
        );

        return response;
    }
);

/**
 * Fetch the user's statistics.
 */
export const getStats = createAsyncThunk(
    "user/getStats",
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            `${import.meta.env.VITE_SERVER_URL}/users/stats`,
            "GET",
            "Bearer"
        );

        return response;
    }
);

/**
 * Fetch the user's collection.
 */
export const getCollection = createAsyncThunk(
    "user/getCollection",
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            `${import.meta.env.VITE_SERVER_URL}/users/collection`,
            "GET",
            "Bearer"
        );

        return response;
    }
);

/**
 * Update the user's profile pictures.
 * @param profilePicture - The ID of the new profile picture.
 * @param profileBorder - The ID of the new profile border.
 */
export const changeProfilePics = createAsyncThunk(
    "user/changeProfilePics",
    async (
        { profilePicture, profileBorder }: { profilePicture: number; profileBorder: number },
        { dispatch, getState }
    ) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            `${import.meta.env.VITE_SERVER_URL}/users/profile`,
            "PUT",
            "Bearer",
            { profilePicture, profileBorder }
        );

        return response;
    }
);

/**
 * Fetch available game modes.
 * @param type - The type of game modes to fetch (singleplayer or multiplayer).
 */
export const getGamemodes = createAsyncThunk(
    "game/getGamemodes",
    async (
        type: 'singleplayer' | 'multiplayer',
        { dispatch, getState }
    ) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            `${import.meta.env.VITE_SERVER_URL}/game/${type}`,
            "GET",
            "Bearer"
        );

        return response;
    }
);