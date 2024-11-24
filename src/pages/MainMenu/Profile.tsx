import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

interface ProfileProps{
    openAuth: (value: boolean) => void
}

export function Profile(props: ProfileProps){
    const username = useSelector((state: RootState) => state.user.username);
    const profilePicture = useSelector((state: RootState) => state.user.profilePicture);
    const profileBorder = useSelector((state: RootState) => state.user.profileBorder);
    return <div id="account" onClick={() => {props.openAuth(true)}}>
        <div id="profileBorder"
            style={{
                backgroundImage: `url(${profileBorder?.src})`
            }}
        >
            <img id="profilePicture" src={profilePicture?.src} alt={profilePicture?.name} />
        </div>
        <h1 id="profileName">{username}</h1>
    </div>
}