import { StoneButton } from "../../components/StoneButton"
import { StoneSlider } from "../../components/StoneSlider"
import { ISettings } from "../../interfaces/ISettings"

function* generateTableMapping(table: Array<string>) {
    for (let i = 1; i <= 9; i++) {
        yield
    }
}

interface SettingsMainProps {
    profile: ISettings
}

export function SettingsMain(props: SettingsMainProps) {
    return <section id="settingsMain">
        <div id="settingsList">
            <h2 className="settingsLabel">General</h2>

            <span>Volume</span>
            <StoneSlider min={0} max={100} value={props.profile.volume} />
            <StoneButton>Reset</StoneButton>

            <span>Images Size</span>
            <StoneSlider min={0} max={100} value={props.profile.imagesSize} />
            <StoneButton>Reset</StoneButton>

            <h2 className="settingsLabel">Controls</h2>

            <span>Enable Tap Mode</span>
            <StoneButton>{props.profile.controls.isTapMode ? "Enable" : "Disable"}</StoneButton>
            <StoneButton>Reset</StoneButton>

            <span>Drag / Duplicate Items</span>
            <StoneButton>{props.profile.controls.copy}</StoneButton>
            <StoneButton>Reset</StoneButton>

            <span>Remove Items</span>
            <StoneButton>{props.profile.controls.remove}</StoneButton>
            <StoneButton>Reset</StoneButton>

            {Array.from({ length: 9 }, (_, i) => {
                return <>
                    <span>Slot {i + 1}</span>
                    <StoneButton>{props.profile.controls.teableMapping[i]}</StoneButton>
                    <StoneButton>Reset</StoneButton>
                </>
            })}
        </div>
    </section>
}