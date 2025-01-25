import { useEffect, useState } from "react";
import { SoundEffect } from "../classes/Audio";
import { IAchievement } from "../interfaces/IAchievement";

interface AchievementsProps {
    achievements: IAchievement[];
}

interface AchievementProps {
    achievement: IAchievement;
}

const rarityColors = ["#FFFF55", "#55FFFF", "#FF55FF"];

/**
 * Achievements component to display a list of achievements.
 * @param props - The props for the component.
 * @returns The Achievements component.
 */
export function Achievements(props: AchievementsProps) {
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        SoundEffect.play("achievement");
        setAnimKey(prevKey => prevKey + 1);
    }, [props.achievements]); 

    return <div id="achievements" key={animKey}>
        {
            props.achievements.map((achievement, index) => {
                return <Achievement key={index} achievement={achievement} />
            })
        }
    </div>
}

/**
 * Achievement component to display an achievement.
 * @param props - The props for the component.
 * @returns The Achievement component.
 */
export function Achievement(props: AchievementProps) {
    const achievement = props.achievement;
    return <div className="achievement">
        <h1 className="achievementTitle" style={{color: rarityColors[achievement.rarity]}}>{achievement.title}</h1>
        <p className="achievementDescription">{achievement.description}</p>
        <img className="achievementIcon" src={`http://localhost:3000/assets/achievements/${achievement.icon}`} alt="Achievement Icon" />
    </div>
}