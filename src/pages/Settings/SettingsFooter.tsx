import { store } from "../../app/store";
import { StoneButton } from "../../components/StoneButton";
import { changeSettings } from "../../features/user/dataRequestSlice";
import { saveSettings } from "../../features/user/userSlice";
import { ISettings } from "../../interfaces/ISettings";
import isEqual from 'lodash/isEqual';

/**
 * Props for the SettingsFooter component.
 */
interface SettingsFooterProps {
    profile: number;
    profiles: Array<ISettings> | null;
    originalSettings: Array<ISettings> | null;
    setSettings: (value: Array<ISettings>) => void;
}

/**
 * Remove the isSet property from the settings object.
 * @param obj - The settings object.
 * @returns The settings object without the isSet property.
 */
function removeIsSet(obj: ISettings | null) {
    if (obj === null) {
        return {} as ISettings;
    }
    let newObj = {...obj}
    newObj.isSet = false
    return newObj;
}

/**
 * SettingsFooter component to display the footer with action buttons.
 * @param props - The properties for the SettingsFooter component.
 * @returns The SettingsFooter component.
 */
export function SettingsFooter(props: SettingsFooterProps) {
    let saveable = !isEqual(
        removeIsSet(props.originalSettings && props.originalSettings[props.profile]),
        removeIsSet(props.profiles && props.profiles[props.profile])
    );

    function save(currentSettings: ISettings[], originalSettings: ISettings[]) {
        let settings: Array<ISettings> = JSON.parse(JSON.stringify(originalSettings));
        settings[props.profile] = currentSettings[props.profile]
        store.dispatch(saveSettings(settings))
        store.dispatch(changeSettings(settings[props.profile]))
    }
    
    function set() {
        let originalSettings: Array<ISettings> = JSON.parse(JSON.stringify(props.originalSettings));
        let newSettings: Array<ISettings> = JSON.parse(JSON.stringify(props.profiles));
        originalSettings.forEach((singleSettings, index) => {
            singleSettings.isSet = props.profile === index;
        });
        newSettings.forEach((singleSettings, index) => {
            singleSettings.isSet = props.profile === index;
        });
        props.setSettings(newSettings);
        return { newSettings, originalSettings }
    }
    
    return <footer id="settingsFooter">
        <div>
            <StoneButton disabled={!saveable} onClick={() => {
                if(props.originalSettings){
                    let currentSettings: Array<ISettings> = JSON.parse(JSON.stringify(props.profiles));
                    currentSettings[props.profile] = props.originalSettings[props.profile]
                    props.setSettings(currentSettings)
                }
            }}>Cancel</StoneButton>
            <StoneButton disabled={!saveable} onClick={() => {
                props.profiles && save(props.profiles, props.originalSettings || [])
            }}>Save</StoneButton>
            <StoneButton disabled={props.profiles ? props.profiles[props.profile].isSet : undefined} onClick={() => {
                const settedSettings = set()
                save(settedSettings.newSettings, settedSettings.originalSettings);
            }}>{saveable ? "Save & Set" : "Set"}</StoneButton>
        </div>
    </footer>
}