import { Hearts } from "../pages/Game/Hearts";
import "../style.css";

export default {
    title: "Components/Hearts",
    component: Hearts,
};

/**
 * Turn0 story for the Hearts component.
 * @returns The Turn0 story.
 */
export const Turn0 = () => <Hearts turn={0} maxHearts={10}/>;

/**
 * Turn3 story for the Hearts component.
 * @returns The Turn3 story.
 */
export const Turn3 = () => <Hearts turn={3} maxHearts={10}/>;

/**
 * Turn11 story for the Hearts component.
 * @returns The Turn11 story.
 */
export const Turn11 = () => <Hearts turn={11} maxHearts={10}/>;

/**
 * Turn14 story for the Hearts component.
 * @returns The Turn14 story.
 */
export const Turn14 = () => <Hearts turn={14} maxHearts={10}/>;

/**
 * Turn19 story for the Hearts component.
 * @returns The Turn19 story.
 */
export const Turn19 = () => <Hearts turn={19} maxHearts={10}/>;

/**
 * Turn20 story for the Hearts component.
 * @returns The Turn20 story.
 */
export const Turn20 = () => <Hearts turn={20} maxHearts={10}/>;