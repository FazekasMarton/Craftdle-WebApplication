import { store } from "../app/store"
import { getSettings } from "../features/user/dataRequestSlice"
import { saveSettings } from "../features/user/userSlice"
import { IResponse } from "../interfaces/IResponse"
import { ISettings } from "../interfaces/ISettings"

/**
 * Function to load user settings from the server and save them to the Redux store.
 * 
 * This function checks if the current user is not a guest. If the user is logged in,
 * it dispatches a request to fetch the user's settings from the server. Once the settings
 * are retrieved, they are saved to the Redux store.
 * 
 * @async
 * @returns {Promise<void>} A promise that resolves when the settings are loaded and saved.
 */
export async function loadSettings() {
    if(!store.getState().user.isGuest){
        const response = await store.dispatch(getSettings())
        const res = (response.payload as IResponse)
        if (res.response) {
            store.dispatch(saveSettings(res.data.data as ISettings[]))
        }
    }
}