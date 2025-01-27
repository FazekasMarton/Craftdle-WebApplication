import { Profile } from "../pages/MainMenu/Profile";
import "../style.css";
import { Provider, useDispatch } from "react-redux";
import { saveUser } from "../features/user/userSlice";
import { store } from "../app/store";

/**
 * Function to handle changes in the authentication state.
 * @param value - The new authentication state.
 */
function setAuthOpened(value: boolean) {
    console.log(`authOpened changed to ${value}`);
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

/**
 * Default story for the Profile component.
 * @returns The Default story.
 */
export function Default() {
    const fakeUser = {
        username: "Martin Potter",
        loginToken: "1234-5678-9012-3456-7890",
        isGuest: false,
        stayLoggedIn: false,
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
    };
    const dispatch = useDispatch();
    dispatch(saveUser(fakeUser));
    return <Profile openAuth={setAuthOpened} />;
}