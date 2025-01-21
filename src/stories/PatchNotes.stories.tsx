import { BrowserRouter } from "react-router-dom";
import { PatchNotes } from "../pages/PatchNotes/PatchNotes";
import "../style.css";

export default {
    title: "Pages/PatchNotes",
    component: PatchNotes,
};

/**
 * Default story for the PatchNotes component.
 * @returns The Default story.
 */
export const Default = () => {
    return <BrowserRouter>
        <PatchNotes />
    </BrowserRouter>;
};