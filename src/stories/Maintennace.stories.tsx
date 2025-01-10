import { Maintenance } from "../pages/Maintenance/Maintenance";
import "../style.css"

export default {
    title: "Pages/Maintenance",
    component: Maintenance,
};

export const OneMinute = () => <Maintenance time={67}/>

export const OneHour = () => <Maintenance time={3667}/>

export const OneDay = () => <Maintenance time={90067}/>