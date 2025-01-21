import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { SettingsFooter } from "./SettingsFooter";
import { SettingsHeader } from "./SettingsHeader";
import { SettingsMain } from "./SettingsMain";
import { useEffect, useState } from "react";
import { ISettings } from "../../interfaces/ISettings";
import { loadSettings } from "../../functions/loadSettings";

/**
 * Settings component to display and manage user settings.
 * @returns The Settings component.
 */
export function Settings() {
    const originalSettings = useSelector((state: RootState) => state.user.settings);
    const [modifiedSettings, setModifiedSettings] = useState<Array<ISettings> | null>(structuredClone(originalSettings))
    const [activeProfile, setActiveProfile] = useState(0)

    useEffect(() => {
        if (!originalSettings) {
            loadSettings()
        }
    }, [])

    useEffect(() => {
        if (!modifiedSettings) {
            setModifiedSettings(structuredClone(originalSettings))
        }
    }, [originalSettings])

    console.log(originalSettings)

    return originalSettings && modifiedSettings ? <main id="settings">
        <SettingsHeader activeProfile={activeProfile} setActiveProfile={setActiveProfile} originalSettings={originalSettings} profiles={modifiedSettings} />
        <SettingsMain setSettings={setModifiedSettings} profiles={modifiedSettings} profile={activeProfile} />
        <SettingsFooter setSettings={setModifiedSettings} originalSettings={originalSettings} profiles={modifiedSettings} profile={activeProfile} />
    </main> : <h1 style={{color: "black"}}>Something went wrong!</h1>
}