import { store } from "../app/store"
import { getSettings } from "../features/user/dataRequestSlice"
import { saveSettings } from "../features/user/userSlice"

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
        let response = await store.dispatch(getSettings())
        let res = (response.payload as any)
        if (res.response) {
            store.dispatch(saveSettings(res.data.data))
        }
    }
}