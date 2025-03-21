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
    const user = useSelector((state: RootState) => state.user);
    const originalSettings = user.settings
    const [modifiedSettings, setModifiedSettings] = useState<Array<ISettings> | null>(structuredClone(originalSettings))
    const [activeProfile, setActiveProfile] = useState<number>(originalSettings?.findIndex(s => s.isSet) ?? 0)

    /**
     * Loads settings from the server if they are not already loaded.
     */
    useEffect(() => {
        if (!originalSettings && user.loginToken) {
            loadSettings()
        }
    }, [user])

    /**
     * Resets the modified settings and active profile when the original settings change.
     */
    useEffect(() => {
        if (!modifiedSettings) {
            setModifiedSettings(structuredClone(originalSettings))
            setActiveProfile(originalSettings?.findIndex(s => s.isSet) ?? 0)
        }
    }, [originalSettings])

    return <main id="settings">
        <SettingsHeader activeProfile={activeProfile} setActiveProfile={setActiveProfile} originalSettings={originalSettings} profiles={modifiedSettings} />
        <SettingsMain setSettings={setModifiedSettings} profiles={modifiedSettings} profile={activeProfile} />
        <SettingsFooter setSettings={setModifiedSettings} originalSettings={originalSettings} profiles={modifiedSettings} profile={activeProfile} />
    </main>
}