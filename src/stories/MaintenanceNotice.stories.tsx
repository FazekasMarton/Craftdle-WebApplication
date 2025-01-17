import { Provider } from "react-redux";
import { MaintenanceNotice } from "../pages/MainMenu/MaintenanceNotice";
import "../style.css"
import { store } from "../app/store";

export default {
    title: "Components/MaintenanceNotice",
    component: MaintenanceNotice,
    decorators: [
        (Story: any) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

export const Default = () => <MaintenanceNotice />