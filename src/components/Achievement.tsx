import { useEffect, useState } from "react";
import { SoundEffect } from "../classes/Audio";
import { IAchievement } from "../interfaces/IAchievement";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface AchievementProps {
    achievement: IAchievement;
}

const rarityColors = ["#FFFF55", "#55FFFF", "#FF55FF"];

/**
 * Achievements component to display a list of achievements.
 * @param props - The props for the component.
 * @returns The Achievements component.
 */
export function Achievements() {
    const socket = useSelector((state: RootState) => state.socket.socket);
    const [animKey, setAnimKey] = useState(0);
    const [achievements, setAchievements] = useState<IAchievement[]>([]);

    useEffect(() => {
        socket?.on("achievements", (performedAchievements: IAchievement[]) => {
            setAchievements((prevAchievements) => {
                const newAchievements = [...prevAchievements, ...performedAchievements];
                return newAchievements;
            });
            setAnimKey(animKey + 1);
        })

        return () => {
            socket?.off("achievements");
        }
    }, [socket, achievements]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (achievements.length > 0) {
                setAchievements((prevAchievements) => {
                    const newAchievements = prevAchievements.slice(5);
                    return newAchievements;
                });
                setAnimKey(animKey + 1);
            }
        }, 9000);

        return () => {
            clearTimeout(timeout);
        }

    }, [achievements]);

    return <div id="achievements" key={animKey}>
        {
            achievements.length > 0 && achievements.map((achievement, index) => {
                SoundEffect.play("achievement");
                if (index < 5) {
                    return <Achievement key={index} achievement={achievement} />
                }
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
        <h1 className="achievementTitle" style={{ color: rarityColors[achievement.rarity] }}>{achievement.title}</h1>
        <p className="achievementDescription">{achievement.description}</p>
        <img className="achievementIcon" src={`http://localhost:3000/assets/${achievement.icon}`} alt="Achievement Icon" draggable={false}/>
    </div>
}