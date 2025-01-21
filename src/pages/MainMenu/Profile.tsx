import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

interface ProfileProps{
    openAuth: (value: boolean) => void
}

export function Profile(props: ProfileProps){
    const username = useSelector((state: RootState) => state.user.username);
    const profilePicture = useSelector((state: RootState) => state.user.profilePicture);
    const profileBorder = useSelector((state: RootState) => state.user.profileBorder);
    return <div className="account" onClick={() => {props.openAuth(true)}}>
        <div className="profileBorder"
            style={profileBorder ? {
                backgroundImage: `url(http://localhost:3000/profileBorders/${profileBorder?.src})`
            } : {}}
        >
            {profilePicture ? <img className="profilePicture" src={`http://localhost:3000/profilePictures/${profilePicture?.src}`} alt={`Profile picture of ${profilePicture?.name}`} /> : null}
        </div>
        <h1 className="profileName">{username}</h1>
    </div>
}