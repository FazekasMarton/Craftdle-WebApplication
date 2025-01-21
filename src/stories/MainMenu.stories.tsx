import { Provider, useDispatch } from "react-redux";
import "../style.css"
import { store } from "../app/store";
import { clearUser, saveUser } from "../features/user/userSlice";
import { BrowserRouter } from "react-router-dom";
import { MainMenu } from "../pages/MainMenu/MainMenu";
import { handlers } from './handlers';

export default {
    title: "Pages/MainMenu",
    component: MainMenu,
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

// Story for a registered user
export const RegisteredUser = () => {
    store.dispatch(clearUser(true))
    const fakeUser = {
        username: "Martin Potter",
        loginToken: "1234-5678-9012-3456-7890",
        isGuest: false,
        stayLoggedIn: true,
        profilePicture: {
            id: "picture",
            name: "test_picture",
            src: "Test_Picture.png"
        },
        profileBorder: {
            id: "border",
            name: "test_border",
            src: "Test_Border.png"
        }
    }
    const dispatch = useDispatch()
    dispatch(saveUser(fakeUser))
    return <BrowserRouter>
        <MainMenu />
    </BrowserRouter>
}

// Story for a guest user
export const Guest = () => {
    store.dispatch(clearUser(true))
    return <BrowserRouter>
        <MainMenu />
    </BrowserRouter>
}