import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

async function communicate(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    auth?: { type: "Basic" | "Bearer"; token: string },
    body?: object
) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (auth) {
        headers["Authorization"] =
            auth.type === "Basic"
                ? `Basic ${btoa(auth.token)}`
                : `Bearer ${auth.token}`;
    }

    const options: RequestInit = {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        return { data, response };
    } catch (err) {
        console.error("API Error:", err);
        throw err;
    }
}

export const register = createAsyncThunk(
    "user/register",
    async (
        { username, email, password, stayLoggedIn }: 
        { username: string; email: string; password: string; stayLoggedIn: boolean },
        { getState }
    ) => {
        const state = getState() as RootState;

        const response = await communicate(
            "https://localhost:3000/user/register",
            "POST",
            { type: "Bearer", token: state.user.loginToken || "" },
            {
                username: username,
                email: email,
                password: password,
                stayLoggedIn: stayLoggedIn,
            }
        );

        return response?.data;
    }
);