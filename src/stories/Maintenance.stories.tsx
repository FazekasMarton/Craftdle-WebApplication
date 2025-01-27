import { Provider } from "react-redux";
import { Maintenance } from "../pages/Maintenance/Maintenance";
import "../style.css";
import { store } from "../app/store";

export default {
    title: "Pages/Maintenance",
    component: Maintenance,
    decorators: [
        (Story: any) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ],
};

/**
 * Default story for the Maintenance component.
 * @returns The Default story.
 */
export const Default = () => <Maintenance />;
