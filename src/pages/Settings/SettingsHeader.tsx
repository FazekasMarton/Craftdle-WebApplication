import { StoneButton } from "../../components/StoneButton";

export function SettingsHeader() {
    return <header id="settingsHeader">
        <h1>Settings</h1>
        <nav>
            <StoneButton>Back to Menu</StoneButton>
            <StoneButton>Profile 1</StoneButton>
        </nav>
    </header>
}