import { Provider, useDispatch } from "react-redux";
import "../style.css"
import { store } from "../app/store";
import { saveSettings } from "../features/user/userSlice";
import { BrowserRouter } from "react-router-dom";
import { handlers } from './handlers';
import { Settings } from "../pages/Settings/Settings";
import { ISettings } from "../interfaces/ISettings";
import { faker } from "@faker-js/faker";

function generateSettings() {
    let settings = []
    for (let i = 0; i < 3; i++) {
        let mapping = []
        for (let i = 0; i < 9; i++) {
            mapping.push(faker.string.alphanumeric(1))
        }
        settings.push({
            id: i,
            volume: faker.number.int({ min: 0, max: 100 }),
            imagesSize: faker.number.int({ min: 0, max: 100 }),
            isSet: faker.datatype.boolean(),
            controls: {
                isTapMode: faker.datatype.boolean(),
                copy: faker.string.alphanumeric(1),
                remove: faker.string.alphanumeric(1),
                tableMapping: mapping
            }
        })
    }
    return settings
}

export default {
    title: "Page/Settings",
    component: Settings,
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

export const Deafault = () => {
    const fakeSettings: Array<ISettings> = generateSettings()
    const dispatch = useDispatch()
    dispatch(saveSettings(fakeSettings))
    return <BrowserRouter>
        <Settings />
    </BrowserRouter>
}