import { store } from "../../app/store";
import { StoneButton } from "../../components/StoneButton";
import { saveSettings } from "../../features/user/userSlice";
import { ISettings } from "../../interfaces/ISettings";
import isEqual from 'lodash/isEqual';

interface SettingsFooterProps{
    profile: number;
    profiles: Array<ISettings>;
    originalSettings: Array<ISettings> | null;
    setSettings: (value: Array<ISettings>) => void;
}

function removeIsSet(obj: ISettings | null) {
    if (obj === null) {
        return {} as ISettings;
    }
    let newObj = {...obj}
    newObj.isSet = false
    return newObj;
}

export function SettingsFooter(props: SettingsFooterProps) {
    let saveable = !isEqual(
        removeIsSet(props.originalSettings && props.originalSettings[props.profile]),
        removeIsSet(props.profiles[props.profile])
    );

    function save(currentSettings: ISettings[]){
        let settings: Array<ISettings> = JSON.parse(JSON.stringify(props.originalSettings));
        settings[props.profile] = currentSettings[props.profile]
        store.dispatch(saveSettings(settings))
    }

    function set() {
        let newSettings: Array<ISettings> = JSON.parse(JSON.stringify(props.profiles));
        newSettings.forEach((singleSettings, index) => {
            singleSettings.isSet = props.profile === index;
        });
        props.setSettings(newSettings);
        return newSettings
    }

    return <footer id="settingsFooter">
        <div>
            <StoneButton disabled={!saveable}>Cancel</StoneButton>
            <StoneButton disabled={!saveable} onClick={() => {
                save(props.profiles)
            }}>Save</StoneButton>
            <StoneButton disabled={props.profiles[props.profile].isSet} onClick={() => {
                save(set());
            }}>{saveable ? "Save & Set" : "Set"}</StoneButton>
        </div>
    </footer>
}