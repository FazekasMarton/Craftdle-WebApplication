import { Provider, useDispatch } from "react-redux";
import "../style.css"
import { store } from "../app/store";
import { saveUser } from "../features/user/userSlice";
import { BrowserRouter } from "react-router-dom";
import { MainMenu } from "../pages/MainMenu/MainMenu";
import fox from "./assets/imgs/profilePictures/Fox.png"
import ice from "./assets/imgs/profileBorders/Snow.png"
import villager from "./assets/imgs/profilePictures/Desert_Nitwit.png"
import wood from "./assets/imgs/profileBorders/Spruce_Planks.png"

export default {
    title: "Components/MainMenu",
    component: MainMenu,
    decorators: [
        (Story: any) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

export const RegisteredUser = () => {
    const fakeUser = {
        username: "Martin Potter",
        loginToken: "1234-5678-9012-3456-7890",
        isGuest: false,
        stayLoggedIn: false,
        profilePicture: {
            id: "picture",
            name: "test_picture",
            src: villager
        },
        profileBorder: {
            id: "border",
            name: "test_border",
            src: wood
        }
    }
    const dispatch = useDispatch()
    dispatch(saveUser(fakeUser))
    return <BrowserRouter>
        <MainMenu />
    </BrowserRouter>
}

export const Guest = () => {
    const fakeUser = {
        username: "Guest1234",
        loginToken: "1234-5678-9012-3456-7890",
        isGuest: true,
        stayLoggedIn: false,
        profilePicture: {
            id: "picture",
            name: "test_picture",
            src: fox
        },
        profileBorder: {
            id: "border",
            name: "test_border",
            src: ice
        }
    }
    const dispatch = useDispatch()
    dispatch(saveUser(fakeUser))
    return <BrowserRouter>
        <MainMenu />
    </BrowserRouter>
}