import { StoneButton } from "../../components/StoneButton";
import warning from "../../assets/imgs/icons/error_highlighted.png"
import { ISettings } from "../../interfaces/ISettings";
import { isEqual } from "lodash";
import { useNavigate } from "react-router-dom";

/**
 * Props for the SettingsHeader component.
 */
interface SettingsHeaderProps {
    activeProfile: number;
    setActiveProfile: (value: number) => void;
    profiles: Array<ISettings>;
    originalSettings: Array<ISettings> | null;
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
 * SettingsHeader component to display the header with navigation buttons.
 * @param props - The properties for the SettingsHeader component.
 * @returns The SettingsHeader component.
 */
export function SettingsHeader(props: SettingsHeaderProps) {
    const navigate = useNavigate();

    function changeNextProfile() {
        props.setActiveProfile((props.activeProfile + 1) % 3)
    }

    let saveable = !isEqual(
        removeIsSet(props.originalSettings && props.originalSettings[props.activeProfile]),
        removeIsSet(props.profiles[props.activeProfile])
    );

    return <header id="settingsHeader">
        <h1>Settings</h1>
        <nav>
            <StoneButton onClick={() => navigate(-1)} info={saveable ? {
                title: "Warning",
                titleColor: "#AA0000",
                text: "Unsaved changes exist"
            } : undefined}>{saveable ? <img src={warning} alt="warning"/> : null}Back to Menu</StoneButton>
            <StoneButton onClick={changeNextProfile}>Profile {props.activeProfile + 1}</StoneButton>
        </nav>
    </header>
}