import { ProfileImage } from "../interfaces/ProfileImage";
import { Profile } from "../pages/MainMenu/Profile";
import "../style.css"
import desertFletcher from "./assets/imgs/profilePictures/Desert_Fletcher.png"
import amethyst from "./assets/imgs/profileBorders/Amethyst.png"
import enderman from "./assets/imgs/profilePictures/Enderman.png"
import portal from "./assets/imgs/profileBorders/Nether_Portal.png"
import fox from "./assets/imgs/profilePictures/Fox.png"
import lava from "./assets/imgs/profileBorders/Lava.png"

function setAuthOpened(value: boolean){
    console.log(`authOpened changed to ${value}`)
}

export default {
    title: "Components/Profile",
    component: Profile,
};

export function Villager(){
    const testPPicture: ProfileImage = {
        id: "picture",
        name: "test_picture",
        src: desertFletcher
    }
    const testPBorder: ProfileImage = {
        id: "border",
        name: "test_border",
        src: amethyst
    }
    return <Profile openAuth={setAuthOpened} username="Martin Potter" profileBorder={testPBorder} profilePicture={testPPicture} />
}

export function Enderman(){
    const testPPicture: ProfileImage = {
        id: "picture",
        name: "test_picture",
        src: enderman
    }
    const testPBorder: ProfileImage = {
        id: "border",
        name: "test_border",
        src: portal
    }
    return <Profile openAuth={setAuthOpened} username="Martin Potter" profileBorder={testPBorder} profilePicture={testPPicture} />
}

export function Fox(){
    const testPPicture: ProfileImage = {
        id: "picture",
        name: "test_picture",
        src: fox
    }
    const testPBorder: ProfileImage = {
        id: "border",
        name: "test_border",
        src: lava
    }
    return <Profile openAuth={setAuthOpened} username="Martin Potter" profileBorder={testPBorder} profilePicture={testPPicture} />
}