import { Provider, useDispatch } from "react-redux";
import { UserAuth } from "../pages/MainMenu/UserAuth";
import "../style.css"
import { store } from "../app/store";
import { saveUser } from "../features/user/userSlice";
import { BrowserRouter } from "react-router-dom";

function setAuthOpened(value: boolean){
    console.log(`authOpened changed to ${value}`)
}

export default {
    title: "Components/UserAuth",
    component: UserAuth,
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
            src: "testP.png"
        },
        profileBorder: {
            id: "border",
            name: "test_border",
            src: "testB.png"
        }
    }
    const dispatch = useDispatch()
    dispatch(saveUser(fakeUser))
    return <BrowserRouter>
        <UserAuth openAuth={setAuthOpened} socket={null}/>
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
            src: "testP.png"
        },
        profileBorder: {
            id: "border",
            name: "test_border",
            src: "testB.png"
        }
    }
    const dispatch = useDispatch()
    dispatch(saveUser(fakeUser))
    return <BrowserRouter>
        <UserAuth openAuth={setAuthOpened} socket={null}/>
    </BrowserRouter>
}