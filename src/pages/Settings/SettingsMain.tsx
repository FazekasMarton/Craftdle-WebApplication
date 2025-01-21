import React from "react";
import { StoneButton } from "../../components/StoneButton";
import { StoneSlider } from "../../components/StoneSlider";
import { IControls, ISettings } from "../../interfaces/ISettings";
import { DefaultSettings } from "../../classes/DefaultSettings";

/**
 * Props for the SettingsMain component.
 */
interface SettingsMainProps {
    profile: number;
    profiles: Array<ISettings>;
    setSettings: (value: Array<ISettings>) => void;
}

/**
 * SettingsMain component to display and manage the main settings.
 * @param props - The properties for the SettingsMain component.
 * @returns The SettingsMain component.
 */
export function SettingsMain(props: SettingsMainProps) {
    const profile = props.profiles[props.profile];
    const defaultSettings = DefaultSettings.getDefaultSettings()

    function changeSettings<K extends keyof ISettings>(key: K, value: ISettings[K]) {
        let newSettings: Array<ISettings> = structuredClone(props.profiles);
        newSettings[props.profile][key] = value;
        props.setSettings(newSettings);
    }

    function changeControls<K extends keyof IControls>(key: K, value: IControls[K]) {
        let newSettings: Array<ISettings> = structuredClone(props.profiles);
        newSettings[props.profile].controls[key] = value;
        props.setSettings(newSettings);
    }

    function changeTableMapping(index: number, value: string) {
        let newSettings: Array<ISettings> = structuredClone(props.profiles);
        newSettings[props.profile].controls.tableMapping[index] = value;
        props.setSettings(newSettings);
    }

    function listenInteraction(change: (value: string) => void) {
        change("> <");
        function listenMouse(e: MouseEvent) {
            if (e.button >= 0 && e.button <= 2) {
                switch (e.button) {
                    case 0:
                        change("LMB");
                        break;
                    case 1:
                        change("MMB");
                        break;
                    case 2:
                        change("RMB");
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
                    {profile.controls.isTapMode ? "Enabled" : "Disabled"}
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
                            {profile.controls.tableMapping[i]}
                        </StoneButton>
                        <StoneButton
                            disabled={profile.controls.tableMapping[i] === defaultSettings.controls.tableMapping[i]}
                            onClick={() => { changeTableMapping(i, defaultSettings.controls.tableMapping[i]); }}
                        >Reset</StoneButton>
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
}
