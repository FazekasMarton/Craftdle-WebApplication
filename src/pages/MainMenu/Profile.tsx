import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { SoundEffect } from "../../classes/Audio";

/**
 * Props for the Profile component.
 */
interface ProfileProps {
    openAuth: (value: boolean) => void
}

/**
 * Profile component to display the user's profile picture and name.
 * @param props - The properties for the Profile component.
 * @returns The Profile component.
 */
export function Profile(props: ProfileProps) {
    const username = useSelector((state: RootState) => state.user.username);
    const profilePicture = useSelector((state: RootState) => state.user.profilePicture);
    const profileBorder = useSelector((state: RootState) => state.user.profileBorder);
    return <div className="account" onClick={() => {props.openAuth(true); SoundEffect.play("click")}}>
        <div className="profileBorder"
            style={profileBorder ? {
                backgroundImage: `url(https://craftdle-backend-production.up.railway.app/assets/profileBorders/${profileBorder?.src})`
            } : {}}
        >
            {profilePicture ? <img className="profilePicture" src={`https://craftdle-backend-production.up.railway.app/assets/profilePictures/${profilePicture?.src}`} alt={`Profile picture of ${profilePicture?.name}`} draggable={false}/> : null}
        </div>
        <h1 className="profileName">{username}</h1>
    </div>
}