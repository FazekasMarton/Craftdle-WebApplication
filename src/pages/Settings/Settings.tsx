import { shallowEqual, useSelector } from "react-redux";
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
    const originalSettings = useSelector((state: RootState) => state.user.settings, shallowEqual);
    const [modifiedSettings, setModifiedSettings] = useState<Array<ISettings> | null>(structuredClone(originalSettings))
    const [activeProfile, setActiveProfile] = useState<number>(originalSettings?.findIndex(s => s.isSet) ?? 0)

    useEffect(() => {
        if (!originalSettings) {
            loadSettings()
        }
    }, [])

    useEffect(() => {
        if (originalSettings && modifiedSettings === null) {
            setModifiedSettings(structuredClone(originalSettings));
            setActiveProfile(originalSettings.findIndex(s => s.isSet) ?? 0);
        }
    }, [originalSettings]);    

    console.log(originalSettings)

    return <main id="settings">
        <SettingsHeader activeProfile={activeProfile} setActiveProfile={setActiveProfile} originalSettings={originalSettings} profiles={modifiedSettings} />
        <SettingsMain setSettings={setModifiedSettings} profiles={modifiedSettings} profile={activeProfile} />
        <SettingsFooter setSettings={setModifiedSettings} originalSettings={originalSettings} profiles={modifiedSettings} profile={activeProfile} />
    </main>
}