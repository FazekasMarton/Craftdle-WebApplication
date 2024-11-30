import { useSelector } from "react-redux";
import { RootState, store } from "../../app/store";
import { SettingsFooter } from "./SettingsFooter";
import { SettingsHeader } from "./SettingsHeader";
import { SettingsMain } from "./SettingsMain";
import { useEffect, useState } from "react";
import { ISettings } from "../../interfaces/ISettings";
import { getSettings } from "../../features/user/dataRequestSlice";
import { saveSettings } from "../../features/user/userSlice";

export function Settings() {
    const originalSettings = useSelector((state: RootState) => state.user.settings);
    const [modifiedSettings, setModifiedSettings] = useState<Array<ISettings>>(JSON.parse(JSON.stringify(originalSettings)))
    const [activeProfile, setActiveProfile] = useState(0)

    async function loadSettings() {
        let response = await store.dispatch(getSettings())
        let res = (response.payload as any)
        if (res.response == 200) {
            store.dispatch(saveSettings(res.data.data))
        }
    }

    useEffect(() => {
        if (!originalSettings) {
            loadSettings()
        }
    })

    return <main id="settings">
        <SettingsHeader activeProfile={activeProfile} setActiveProfile={setActiveProfile} originalSettings={originalSettings} profiles={modifiedSettings} />
        <SettingsMain setSettings={setModifiedSettings} profiles={modifiedSettings} profile={activeProfile} />
        <SettingsFooter setSettings={setModifiedSettings} originalSettings={originalSettings} profiles={modifiedSettings} profile={activeProfile} />
    </main>
}