import { SettingsFooter } from "./SettingsFooter";
import { SettingsHeader } from "./SettingsHeader";
import { SettingsMain } from "./SettingsMain";

export function Settings(){
    return <main id="settings">
        <SettingsHeader />
        <SettingsMain />
        <SettingsFooter />
    </main>
}