import { Profile } from "../pages/MainMenu/Profile";
import "../style.css"
import desertFletcher from "./assets/imgs/profilePictures/Desert_Fletcher.png"
import amethyst from "./assets/imgs/profileBorders/Amethyst.png"
import enderman from "./assets/imgs/profilePictures/Enderman.png"
import portal from "./assets/imgs/profileBorders/Nether_Portal.png"
import fox from "./assets/imgs/profilePictures/Fox.png"
import lava from "./assets/imgs/profileBorders/Lava.png"
import { Provider, useDispatch } from "react-redux";
import { saveUser } from "../features/user/userSlice";
import { store } from "../app/store";

function setAuthOpened(value: boolean){
    console.log(`authOpened changed to ${value}`)
}

export default {
    title: "Components/Profile",
    component: Profile,
    decorators: [
        (Story: any) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

export function Villager(){
    const fakeUser = {
        username: "Martin Potter",
        loginToken: "1234-5678-9012-3456-7890",
        isGuest: false,
        stayLoggedIn: false,
        profilePicture: {
            id: "picture",
            name: "test_picture",
            src: desertFletcher
        },
        profileBorder: {
            id: "border",
            name: "test_border",
            src: amethyst
        }
    }
    const dispatch = useDispatch()
    dispatch(saveUser(fakeUser))
    return <Profile openAuth={setAuthOpened} />
}

export function Enderman(){
    const fakeUser = {
        username: "Martin Potter",
        loginToken: "1234-5678-9012-3456-7890",
        isGuest: false,
        stayLoggedIn: false,
        profilePicture: {
            id: "picture",
            name: "test_picture",
            src: enderman
        },
        profileBorder: {
            id: "border",
            name: "test_border",
            src: portal
        }
    }
    const dispatch = useDispatch()
    dispatch(saveUser(fakeUser))
    return <Profile openAuth={setAuthOpened} />
}

export function Fox(){
    const fakeUser = {
        username: "Martin Potter",
        loginToken: "1234-5678-9012-3456-7890",
        isGuest: false,
        stayLoggedIn: false,
        profilePicture: {
            id: "picture",
            name: "test_picture",
            src: fox
        },
        profileBorder: {
            id: "border",
            name: "test_border",
            src: lava
        }
    }
    const dispatch = useDispatch()
    dispatch(saveUser(fakeUser))
    return <Profile openAuth={setAuthOpened} />
}