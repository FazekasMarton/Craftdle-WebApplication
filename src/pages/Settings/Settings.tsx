import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { SettingsFooter } from "./SettingsFooter";
import { SettingsHeader } from "./SettingsHeader";
import { SettingsMain } from "./SettingsMain";
import { useEffect, useState } from "react";
import { ISettings } from "../../interfaces/ISettings";
import { loadSettings } from "../../functions/loadSettings";

export function Settings() {
    const originalSettings = useSelector((state: RootState) => state.user.settings);
    const [modifiedSettings, setModifiedSettings] = useState<Array<ISettings>>(structuredClone(originalSettings) || [])
    const [activeProfile, setActiveProfile] = useState(0)

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