import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { SettingsFooter } from "./SettingsFooter";
import { SettingsHeader } from "./SettingsHeader";
import { SettingsMain } from "./SettingsMain";
import { useState } from "react";
import { ISettings } from "../../interfaces/ISettings";

export function Settings(){
    const originalSettings = useSelector((state: RootState) => state.user.settings);
    const [modifiedSettings, setModifiedSettings] = useState<Array<ISettings>>(JSON.parse(JSON.stringify(originalSettings)) )
    const [activeProfile, setActiveProfile] = useState(0)
    return <main id="settings">
        <SettingsHeader activeProfile={activeProfile} setActiveProfile={setActiveProfile}/>
        <SettingsMain profile={modifiedSettings[activeProfile]}/>
        <SettingsFooter />
    </main>
}