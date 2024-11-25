import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { setError } from "../error/errorSlice";
import { Settings } from "../../interfaces/Settings";

async function communicate(
    state: RootState,
    dispatch: Function,
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    auth?: "Basic" | "Bearer" | null,
    body?: object,
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
        return { data: data, response: response.status };
    } catch (err: any) {
        dispatch(setError(err.name));
    }
}

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
            "https://localhost:3000/users/register",
            "POST",
            null,
            {
                username: username,
                email: email,
                password: password,
                stayLoggedIn: stayLoggedIn,
            },
        );

        return response;
    }
);

export const guestLogin = createAsyncThunk(
    "user/guestLogin",
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            "https://localhost:3000/users/login",
            "GET"
        );

        return response;
    }
);

export const tokenLogin = createAsyncThunk(
    "user/tokenLogin",
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            "https://localhost:3000/users/login",
            "POST",
            "Bearer"
        );

        return response;
    }
);

export const login = createAsyncThunk(
    "user/login",
    async ({ username, password, stayLoggedIn }:
        { username: string; password: string; stayLoggedIn: boolean },
        { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            "https://localhost:3000/users/login",
            "POST",
            undefined,
            { username, password, stayLoggedIn }
        );

        return response;
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            "https://localhost:3000/users/login",
            "DELETE",
            "Basic"
        );

        return response;
    }
);

export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (email: string, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            "https://localhost:3000/users/password",
            "POST",
            "Bearer",
            { email: email }
        );

        return response;
    }
);

export const changePassword = createAsyncThunk(
    "user/changePassword",
    async (password: string, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            "https://localhost:3000/users/password",
            "PUT",
            "Bearer",
            { password: password }
        );

        return response;
    }
);

export const getSettings = createAsyncThunk(
    "user/getSettings",
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            "https://localhost:3000/users/settings",
            "GET",
            "Bearer"
        );

        return response;
    }
);

export const changeSettings = createAsyncThunk(
    "user/changeSettings",
    async (settings: Settings, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            `https://localhost:3000/users/settings/${settings.id}`,
            "PUT",
            "Bearer",
            settings
        );

        return response;
    }
);

export const getStats = createAsyncThunk(
    "user/getStats",
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            "https://localhost:3000/users/stats",
            "GET",
            "Bearer"
        );

        return response;
    }
);

export const getCollection = createAsyncThunk(
    "user/getCollection",
    async (_, { dispatch, getState }) => {
        const state = getState() as RootState;

        const response = await communicate(
            state,
            dispatch,
            "https://localhost:3000/users/collection",
            "GET",
            "Bearer"
        );

        return response;
    }
);

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
            "https://localhost:3000/users/profile",
            "PUT",
            "Bearer",
            { profilePicture, profileBorder }
        );

        return response;
    }
);

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
            `https://localhost:3000/game/${type}`,
            "GET",
            "Bearer"
        );

        return response;
    }
);