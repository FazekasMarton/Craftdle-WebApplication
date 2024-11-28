import { StoneButton } from "../../components/StoneButton"
import { StoneSlider } from "../../components/StoneSlider"
import { IControls, ISettings } from "../../interfaces/ISettings"

interface SettingsMainProps {
    profile: number;
    profiles: Array<ISettings>;
    setSettings: (value: Array<ISettings>) => void
}

const defaultSettings: ISettings = {
    id: 0,
    isSet: false,
    volume: 50,
    imagesSize: 50,
    controls: {
        isTapMode: false,
        copy: "Left Mouse Click",
        remove: "Right Mouse Click",
        teableMapping: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    }
}

export function SettingsMain(props: SettingsMainProps) {
    const profile = props.profiles[props.profile]

    function changeSettings<K extends keyof ISettings>(key: K, value: ISettings[K]) {
        let newSettings: Array<ISettings> = JSON.parse(JSON.stringify(props.profiles))
        newSettings[props.profile][key] = value
        props.setSettings(newSettings)
    }

    function changeControls<K extends keyof IControls>(key: K, value: IControls[K]) {
        let newSettings: Array<ISettings> = JSON.parse(JSON.stringify(props.profiles))
        newSettings[props.profile].controls[key] = value
        props.setSettings(newSettings)
    }

    function changeTableMapping(index: number, value: string) {
        let newSettings: Array<ISettings> = JSON.parse(JSON.stringify(props.profiles))
        newSettings[props.profile].controls.teableMapping[index] = value
        props.setSettings(newSettings)
    }

    return <section id="settingsMain">
        <div id="settingsList">
            <h2 className="settingsLabel">General</h2>

            <span>Volume</span>
            <StoneSlider min={0} max={100} value={profile.volume} setValue={{ fun: changeSettings, key: "volume" }} />
            <StoneButton
                disabled={profile.volume == defaultSettings.volume}
                onClick={() => { changeSettings("volume", defaultSettings.volume) }}
            >Reset</StoneButton>

            <span>Images Size</span>
            <StoneSlider min={0} max={100} value={profile.imagesSize} setValue={{ fun: changeSettings, key: "imagesSize" }} />
            <StoneButton
                disabled={profile.imagesSize == defaultSettings.imagesSize}
                onClick={() => { changeSettings("imagesSize", defaultSettings.imagesSize) }}
            >Reset</StoneButton>

            <h2 className="settingsLabel">Controls</h2>

            <span>Enable Tap Mode</span>
            <StoneButton onClick={() => { changeControls("isTapMode", !profile.controls.isTapMode) }}>{profile.controls.isTapMode ? "Enable" : "Disable"}</StoneButton>
            <StoneButton
                disabled={profile.controls.isTapMode == defaultSettings.controls.isTapMode}
                onClick={() => { changeControls("isTapMode", defaultSettings.controls.isTapMode) }}
            >Reset</StoneButton>

            <span>Drag / Duplicate Items</span>
            <StoneButton>{profile.controls.copy}</StoneButton>
            <StoneButton
                disabled={profile.controls.copy == defaultSettings.controls.copy}
                onClick={() => { changeControls("copy", defaultSettings.controls.copy) }}
            >Reset</StoneButton>

            <span>Remove Items</span>
            <StoneButton>{profile.controls.remove}</StoneButton>
            <StoneButton
                disabled={profile.controls.remove == defaultSettings.controls.remove}
                onClick={() => { changeControls("remove", defaultSettings.controls.remove) }}
            >Reset</StoneButton>

            {Array.from({ length: 9 }, (_, i) => {
                return <>
                    <span>Slot {i + 1}</span>
                    <StoneButton>{profile.controls.teableMapping[i]}</StoneButton>
                    <StoneButton
                        disabled={profile.controls.teableMapping[i] == defaultSettings.controls.teableMapping[i]}
                        onClick={() => { changeTableMapping(i, defaultSettings.controls.teableMapping[i]) }}
                    >Reset</StoneButton>
                </>
            })}
        </div>
    </section>
}