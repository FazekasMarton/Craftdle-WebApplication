import { StoneButton } from "../../components/StoneButton";
import warning from "../../assets/imgs/icons/error_highlighted.png"
import { ISettings } from "../../interfaces/ISettings";
import { isEqual } from "lodash";


interface SettingsHeaderProps{
    activeProfile: number;
    setActiveProfile: (value: number) => void;
    profiles: Array<ISettings>;
    originalSettings: Array<ISettings> | null;
}

function removeIsSet(obj: ISettings | null) {
    if (obj === null) {
        return {} as ISettings;
    }
    let newObj = {...obj}
    newObj.isSet = false
    return newObj;
}

export function SettingsHeader(props: SettingsHeaderProps) {
    function changeNextProfile(){
        props.setActiveProfile((props.activeProfile + 1) % 3)
    }

    let saveable = !isEqual(
        removeIsSet(props.originalSettings && props.originalSettings[props.activeProfile]),
        removeIsSet(props.profiles[props.activeProfile])
    );

    return <header id="settingsHeader">
        <h1>Settings</h1>
        <nav>
            <StoneButton href="/" info={saveable ? <>
                <div style={{color: "#AA0000"}}>Warning</div>
                <div>Unsaved changes exist</div>
            </> : undefined}>{saveable ? <img src={warning} alt="warning"/> : null}Back to Menu</StoneButton>
            <StoneButton onClick={changeNextProfile}>Profile {props.activeProfile + 1}</StoneButton>
        </nav>
    </header>
}