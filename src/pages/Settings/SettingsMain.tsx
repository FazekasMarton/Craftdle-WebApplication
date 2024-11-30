import React from "react";
import { StoneButton } from "../../components/StoneButton";
import { StoneSlider } from "../../components/StoneSlider";
import { IControls, ISettings } from "../../interfaces/ISettings";

interface SettingsMainProps {
    profile: number;
    profiles: Array<ISettings>;
    setSettings: (value: Array<ISettings>) => void;
}

const defaultSettings: ISettings = {
    id: 0,
    isSet: false,
    volume: 50,
    imagesSize: 50,
    controls: {
        isTapMode: false,
        copy: "Left Mouse Button",
        remove: "Right Mouse Button",
        teableMapping: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    }
};

export function SettingsMain(props: SettingsMainProps) {
    const profile = props.profiles[props.profile];

    function changeSettings<K extends keyof ISettings>(key: K, value: ISettings[K]) {
        let newSettings: Array<ISettings> = JSON.parse(JSON.stringify(props.profiles));
        newSettings[props.profile][key] = value;
        props.setSettings(newSettings);
    }

    function changeControls<K extends keyof IControls>(key: K, value: IControls[K]) {
        let newSettings: Array<ISettings> = JSON.parse(JSON.stringify(props.profiles));
        newSettings[props.profile].controls[key] = value;
        props.setSettings(newSettings);
    }

    function changeTableMapping(index: number, value: string) {
        let newSettings: Array<ISettings> = JSON.parse(JSON.stringify(props.profiles));
        newSettings[props.profile].controls.teableMapping[index] = value;
        props.setSettings(newSettings);
    }

    function listenInteraction(change: (value: string) => void) {
        change("> <");
        function listenMouse(e: MouseEvent) {
            if (e.button >= 0 && e.button <= 2) {
                switch (e.button) {
                    case 0:
                        change("Left Mouse Button");
                        break;
                    case 1:
                        change("Middle Mouse Button");
                        break;
                    case 2:
                        change("Right Mouse Button");
                        break;
                }
                removeListeners()
            }
        }

        function listenKeyboard(e: KeyboardEvent) {
            if (/^[A-Za-z0-9.,;:$#!/?%&()\-*+]+$/.test(e.key)) {
                change(e.key.toUpperCase())
                removeListeners()
            }
        }

        function removeListeners() {
            window.removeEventListener("mousedown", listenMouse);
            window.removeEventListener("keydown", listenKeyboard);
        }

        window.addEventListener("mousedown", listenMouse);
        window.addEventListener("keydown", listenKeyboard);
    }

    return (
        <section id="settingsMain">
            <div id="settingsList">
                <h2 className="settingsLabel">General</h2>

                <span>Volume</span>
                <StoneSlider min={0} max={100} value={profile.volume} setValue={{ fun: changeSettings, key: "volume" }} />
                <StoneButton
                    disabled={profile.volume === defaultSettings.volume}
                    onClick={() => { changeSettings("volume", defaultSettings.volume); }}
                >Reset</StoneButton>

                <span>Images Size</span>
                <StoneSlider min={1} max={100} value={profile.imagesSize} setValue={{ fun: changeSettings, key: "imagesSize" }} />
                <StoneButton
                    disabled={profile.imagesSize === defaultSettings.imagesSize}
                    onClick={() => { changeSettings("imagesSize", defaultSettings.imagesSize); }}
                >Reset</StoneButton>

                <h2 className="settingsLabel">Controls</h2>

                <span>Enable Tap Mode</span>
                <StoneButton onClick={() => { changeControls("isTapMode", !profile.controls.isTapMode); }}>
                    {profile.controls.isTapMode ? "Disable" : "Enable"}
                </StoneButton>
                <StoneButton
                    disabled={profile.controls.isTapMode === defaultSettings.controls.isTapMode}
                    onClick={() => { changeControls("isTapMode", defaultSettings.controls.isTapMode); }}
                >Reset</StoneButton>

                <span>Drag / Duplicate Items</span>
                <StoneButton onClick={() => {
                    listenInteraction((value: string) => { changeControls("copy", value); });
                }}>
                    {profile.controls.copy}
                </StoneButton>
                <StoneButton
                    disabled={profile.controls.copy === defaultSettings.controls.copy}
                    onClick={() => { changeControls("copy", defaultSettings.controls.copy); }}
                >Reset</StoneButton>

                <span>Remove Items</span>
                <StoneButton onClick={() => {
                    listenInteraction((value: string) => { changeControls("remove", value); });
                }}>
                    {profile.controls.remove}
                </StoneButton>
                <StoneButton
                    disabled={profile.controls.remove === defaultSettings.controls.remove}
                    onClick={() => { changeControls("remove", defaultSettings.controls.remove); }}
                >Reset</StoneButton>

                {Array.from({ length: 9 }, (_, i) => (
                    <React.Fragment key={i}>
                        <span>Slot {i + 1}</span>
                        <StoneButton onClick={() => {
                            listenInteraction((value: string) => { changeTableMapping(i, value); });
                        }}>
                            {profile.controls.teableMapping[i]}
                        </StoneButton>
                        <StoneButton
                            disabled={profile.controls.teableMapping[i] === defaultSettings.controls.teableMapping[i]}
                            onClick={() => { changeTableMapping(i, defaultSettings.controls.teableMapping[i]); }}
                        >Reset</StoneButton>
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}
