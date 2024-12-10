import { store } from "../app/store"
import { getSettings } from "../features/user/dataRequestSlice"
import { saveSettings } from "../features/user/userSlice"

export async function loadSettings() {
    let response = await store.dispatch(getSettings())
    let res = (response.payload as any)
    if (res.response == 200) {
        store.dispatch(saveSettings(res.data.data))
    }
}