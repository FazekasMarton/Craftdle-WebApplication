import { MaintenanceNotice } from "../pages/MainMenu/MaintenanceNotice";
import "../style.css"

export default {
    title: "Components/MaintenanceNotice",
    component: MaintenanceNotice,
};

export const OneMinute = () => <MaintenanceNotice time={67}/>

export const OneHour = () => <MaintenanceNotice time={3667}/>

export const OneDay = () => <MaintenanceNotice time={90067}/>