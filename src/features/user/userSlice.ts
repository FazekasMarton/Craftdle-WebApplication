import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISettings } from "../../interfaces/ISettings"
import { IProfileImage } from "../../interfaces/IProfileImage";

interface UserState {
    username: string | null,
    loginToken: string | null,
    isGuest: boolean,
    stayLoggedIn: boolean,
    profilePicture: IProfileImage | null,
    profileBorder: IProfileImage | null,
    settings: ISettings[] | null
}

const initialState: UserState = {
    username: null,
    loginToken: null,
    isGuest: false,
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
        
        saveSettings: (state, action: PayloadAction<ISettings[]>) => {
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
            state.isGuest = false,
            state.stayLoggedIn = false;
            state.profilePicture = null;
            state.profileBorder = null;
            state.settings = null;
        }        
    }
})
export const { saveUser, saveSettings, loadUser, clearUser } = userSlice.actions;
export default userSlice.reducer;