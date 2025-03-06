import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISettings } from "../../interfaces/ISettings"
import { IProfileImage } from "../../interfaces/IProfileImage";
import { BeforeInstallPromptEvent } from "../../interfaces/IBeforeInstallPromptEvent";

/**
 * Interface for the user state.
 */
interface UserState {
    username: string | null,
    loginToken: string | null,
    isGuest: boolean,
    stayLoggedIn: boolean,
    profilePicture: IProfileImage | null,
    profileBorder: IProfileImage | null,
    settings: ISettings[] | null,
    installed: BeforeInstallPromptEvent | null
}

// Initial state for the user slice
const initialState: UserState = {
    username: null,
    loginToken: null,
    isGuest: localStorage.getItem('isGuest') === null,
    stayLoggedIn: false,
    profilePicture: null,
    profileBorder: null,
    settings: null,
    installed: null
};

/**
 * Save user data to the appropriate storage.
 * @param userData - The user data to save.
 */
function save(userData: UserState) {
    const { settings, installed, ...userDataToSave } = userData;

    let storage = userData.stayLoggedIn ? localStorage : sessionStorage

    Object.entries(userDataToSave).forEach(([key, value]) => {
        const storedValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
        storage.setItem(key, storedValue);
    });
}

// Create the user slice
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        /**
         * Save user data.
         * @param state - The current state.
         * @param action - The action containing the user data.
         */
        saveUser: (state, action: PayloadAction<Omit<UserState, 'settings' | 'installed'>>) => {
            Object.assign(state, action.payload);
            save(state);
        },
        /**
         * Save user settings.
         * @param state - The current state.
         * @param action - The action containing the settings data.
         */
        saveSettings: (state, action: PayloadAction<ISettings[]>) => {
            state.settings = action.payload
            save(state)
        },
        /**
         * Load user data from storage.
         * @param state - The current state.
         */
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
            storageContent.isGuest = true
            Object.assign(state, storageContent);
        },
        /**
         * Clear user data.
         * @param state - The current state.
         * @param action - The action indicating whether to clear storage.
         */
        clearUser: (state, action: PayloadAction<boolean>) => {
            state.username = null;
            state.loginToken = null;
            state.isGuest = true;
            state.stayLoggedIn = false;
            state.profilePicture = null;
            state.profileBorder = null;
            state.settings = null;
            if(action.payload) {
                sessionStorage.clear()
                localStorage.clear()
            }
        },
        setInstalled: (state, action: PayloadAction<BeforeInstallPromptEvent | null>) => {
            state.installed = action.payload
        },
        updateProfile: (state, action: PayloadAction<{
            profilePicture: IProfileImage | null,
            profileBorder: IProfileImage | null
        }>) => {
            state.profilePicture = action.payload.profilePicture
            state.profileBorder = action.payload.profileBorder
            save(state)
        }
    }
})

// Export the actions and reducer
export const { saveUser, saveSettings, loadUser, clearUser, updateProfile, setInstalled } = userSlice.actions;
export default userSlice.reducer;