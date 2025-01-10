import { useEffect, useState } from "react";
import { Achievements } from "../components/Achievement";
import { IAchievement } from "../interfaces/IAchievement";
import "../style.css";
import { handlers } from "./handlers";

export default {
    title: "Components/Achievement",
    component: Achievements,
    parameters: {
        msw: {
            handlers: handlers,
        },
    },
};

const achievementList: IAchievement[] = [
    {
        title: "Achievement 1 Completed!",
        description: "You have unlocked an achievement!",
        icon: "http://localhost:3000/gamemodes/Hardcore.png",
        rarity: 0
    },
    {
        title: "Achievement 2 Completed!",
        description: "You have completed an achievement!",
        icon: "http://localhost:3000/gamemodes/AllInOne.png",
        rarity: 2
    },
    {
        title: "Achievement 3 Unlocked!",
        description: "You have unlocked an achievement!",
        icon: "http://localhost:3000/gamemodes/Pocket.png",
        rarity: 2
    },
    {
        title: "Achievement 4 Unlocked!",
        description: "You have unlocked an achievement!",
        icon: "http://localhost:3000/gamemodes/Resource.png",
        rarity: 0
    },
    {
        title: "Achievement 5 Completed!",
        description: "You have completed an achievement!",
        icon: "http://localhost:3000/gamemodes/Classic.png",
        rarity: 0
    },
    {
        title: "Achievement 6 Unlocked!",
        description: "You have unlocked an achievement!",
        icon: "http://localhost:3000/gamemodes/Tutorial.png",
        rarity: 2
    },
    {
        title: "Achievement 7 Unlocked!",
        description: "You have unlocked an achievement!",
        icon: "http://localhost:3000/gamemodes/Pocket.png",
        rarity: 1
    },
    {
        title: "Achievement 8 Completed!",
        description: "You have unlocked an achievement!",
        icon: "http://localhost:3000/gamemodes/Hardcore.png",
        rarity: 0
    },
    {
        title: "Achievement 9 Unlocked!",
        description: "You have completed an achievement!",
        icon: "http://localhost:3000/gamemodes/AllInOne.png",
        rarity: 1
    },
    {
        title: "Achievement 10 Completed!",
        description: "You have unlocked an achievement!",
        icon: "http://localhost:3000/gamemodes/AllInOne.png",
        rarity: 0
    },
    {
        title: "Achievement 11 Unlocked!",
        description: "You have completed an achievement!",
        icon: "http://localhost:3000/gamemodes/Hardcore.png",
        rarity: 1
    }
];

export function Default() {
    const [achievements, setAchievements] = useState(achievementList);
    const [achievementsToShow, setAchievementsToShow] = useState<IAchievement[]>(achievementList.slice(0, 5));

    useEffect(() => {
        const interval = setInterval(() => {
            setAchievements((prevAchievements) => {
                const newAchievements = prevAchievements.slice(5);

                if (newAchievements.length === 0) {
                    clearInterval(interval);
                    return [];
                }

                setAchievementsToShow(newAchievements.slice(0, 5));
                return newAchievements;
            });
        }, 9000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id="wrapper">
            {achievements.length > 0 ? <Achievements achievements={achievementsToShow} /> : null}
        </div>
    );
}

