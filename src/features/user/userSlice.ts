import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Settings } from "../../interfaces/Settings"
import { ProfileImage } from "../../interfaces/ProfileImage";

interface UserState {
    username: string | null,
    loginToken: string | null,
    stayLoggedIn: boolean,
    profilePicture: ProfileImage | null,
    profileBorder: ProfileImage | null,
    settings: Settings[] | null
}

const initialState: UserState = {
    username: null,
    loginToken: null,
    stayLoggedIn: false,
    profilePicture: null,
    profileBorder: null,
    settings: null,
};

function save(userData: UserState) {
    let storage = userData.stayLoggedIn ? localStorage : sessionStorage

    Object.entries(userData).forEach(([key, value]) => {
        const storedValue = typeof value === 'object' ? JSON.stringify(value) : value;
        storage.setItem(key, storedValue);
    });
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action: PayloadAction<Omit<UserState, 'settings'>>) => {
            Object.assign(state, action.payload);
            save(state);
        },
        
        saveSettings: (state, action: PayloadAction<Settings[]>) => {
            state.settings = action.payload
            save(state)
        },
        loadUser: (state) => {
            let storageContent: {[key: string]: any} = {}
            Object.keys(state).forEach((key) => {
                const storedValue = localStorage.getItem(key);
                if (storedValue) {
                    try {
                        const parsedValue = JSON.parse(storedValue);
                        storageContent[key] = parsedValue;
                    } catch {
                        storageContent[key] = storedValue as any;
                    }
                }
            });
            Object.assign(state, storageContent);
        },
        clearUser: (state) => {
            state.username = null;
            state.loginToken = null;
            state.stayLoggedIn = false;
            state.profilePicture = null;
            state.profileBorder = null;
            state.settings = null;
        }        
    }
})
export const { saveUser, saveSettings, loadUser, clearUser } = userSlice.actions;
export default userSlice.reducer;