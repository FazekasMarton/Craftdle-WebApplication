import { StoneButton } from "../../components/StoneButton";

export function SettingsFooter() {
    return <footer id="settingsFooter">
        <div>
            <StoneButton>Cancel</StoneButton>
            <StoneButton>Save</StoneButton>
            <StoneButton>Set</StoneButton>
        </div>
    </footer>
}