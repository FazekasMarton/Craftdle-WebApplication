import { Provider, useDispatch } from "react-redux";
import "../style.css"
import { store } from "../app/store";
import { clearUser, saveUser } from "../features/user/userSlice";
import { BrowserRouter } from "react-router-dom";
import { handlers } from './handlers';
import villager from "./assets/imgs/profilePictures/Desert_Nitwit.png"
import wood from "./assets/imgs/profileBorders/Spruce_Planks.png"
import { Gamemodes } from "../pages/Gamemodes/Gamemodes";

export default {
    title: "Page/Gamemodes",
    component: Gamemodes,
    decorators: [
        (Story: any) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
    parameters: {
        msw: {
            handlers: handlers,
        },
    },
};

export const Singleplayer = () => {
    store.dispatch(clearUser(true))
    const fakeUser = {
        username: "Martin Potter",
        loginToken: "1234-5678-9012-3456-7890",
        isGuest: false,
        stayLoggedIn: true,
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
        <Gamemodes type="singleplayer" />
    </BrowserRouter>
}