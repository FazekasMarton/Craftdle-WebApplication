import { Profile } from "../pages/MainMenu/Profile";
import "../style.css"
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
            src: "Desert_Fletcher.png"
        },
        profileBorder: {
            id: "border",
            name: "test_border",
            src: "Amethyst.png"
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
            src: "Enderman.png"
        },
        profileBorder: {
            id: "border",
            name: "test_border",
            src: "Nether_Portal.png"
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
            src: "Fox.png"
        },
        profileBorder: {
            id: "border",
            name: "test_border",
            src: "Lava.png"
        }
    }
    const dispatch = useDispatch()
    dispatch(saveUser(fakeUser))
    return <Profile openAuth={setAuthOpened} />
}