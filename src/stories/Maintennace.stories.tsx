import { Provider } from "react-redux";
import { Maintenance } from "../pages/Maintenance/Maintenance";
import "../style.css"
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

export const Default = () => <Maintenance />