import { ProfileImage } from "../../interfaces/ProfileImage"

interface ProfileProps{
    username: string,
    profileBorder: ProfileImage,
    profilePicture: ProfileImage,
    openAuth: (value: boolean) => void
}

export function Profile(props: ProfileProps){
    return <div id="account" onClick={() => {props.openAuth(true)}}>
        <div id="profileBorder"
            style={{
                backgroundImage: `url(${props.profileBorder.src})`
            }}
        >
            <img id="profilePicture" src={props.profilePicture.src} alt={props.profilePicture.name} />
        </div>
        <h1 id="profileName">{props.username}</h1>
    </div>
}