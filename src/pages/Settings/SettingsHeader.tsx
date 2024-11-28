import { StoneButton } from "../../components/StoneButton";

interface SettingsHeaderProps{
    activeProfile: number,
    setActiveProfile: (value: number) => void
}

export function SettingsHeader(props: SettingsHeaderProps) {
    function changeNextProfile(){
        props.setActiveProfile((props.activeProfile + 1) % 3)
    }

    return <header id="settingsHeader">
        <h1>Settings</h1>
        <nav>
            <StoneButton href="/">Back to Menu</StoneButton>
            <StoneButton onClick={changeNextProfile}>Profile {props.activeProfile + 1}</StoneButton>
        </nav>
    </header>
}