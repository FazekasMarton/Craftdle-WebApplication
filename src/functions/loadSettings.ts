import { store } from "../app/store"
import { getSettings } from "../features/user/dataRequestSlice"
import { saveSettings } from "../features/user/userSlice"

/**
 * Function to load user settings from the server and save them to the Redux store.
 */
export async function loadSettings() {
    let response = await store.dispatch(getSettings())
    let res = (response.payload as any)
    if (res.response) {
        store.dispatch(saveSettings(res.data.data))
    }
}