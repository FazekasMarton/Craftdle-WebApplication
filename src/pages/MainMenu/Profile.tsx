import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

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
    return <div className="account" onClick={() => {props.openAuth(true)}}>
        <div className="profileBorder"
            style={profileBorder ? {
                backgroundImage: `url(http://localhost:3000/assets/profileBorders/${profileBorder?.src})`
            } : {}}
        >
            {profilePicture ? <img className="profilePicture" src={`http://localhost:3000/assets/profilePictures/${profilePicture?.src}`} alt={`Profile picture of ${profilePicture?.name}`} /> : null}
        </div>
        <h1 className="profileName">{username}</h1>
    </div>
}