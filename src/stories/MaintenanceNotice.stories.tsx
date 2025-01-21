import { Provider } from "react-redux";
import { MaintenanceNotice } from "../pages/MainMenu/MaintenanceNotice";
import "../style.css";
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

/**
 * Default story for the MaintenanceNotice component.
 * @returns The Default story.
 */
export const Default = () => <MaintenanceNotice />;