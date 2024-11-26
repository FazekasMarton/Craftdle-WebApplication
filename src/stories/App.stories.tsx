import { Provider, useDispatch } from "react-redux";
import App from "../App";
import { store } from "../app/store";
import { handlers } from "./handlers";
import { clearUser, saveUser } from "../features/user/userSlice";
import villager from "./assets/imgs/profilePictures/Desert_Nitwit.png"
import wood from "./assets/imgs/profileBorders/Spruce_Planks.png"

export default {
    title: "App/App",
    component: App,
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

export const Default = () => <App />;

export const RegisteredUser = () => {
    store.dispatch(clearUser())
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
    return <App />
}