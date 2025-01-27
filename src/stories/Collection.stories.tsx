import { Provider } from "react-redux";
import "../style.css"
import { store } from "../app/store";
import { BrowserRouter } from "react-router-dom";
import { handlers } from './handlers';
import { Collection } from "../pages/Collection/Collection";

export default {
    title: "Pages/Collection",
    component: Collection,
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

/**
 * Default story for the Collection component.
 * @returns The Default story.
 */
export const Default = () => {
    return <BrowserRouter>
        <Collection />
    </BrowserRouter>
}