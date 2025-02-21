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
    const [start, setStart] = useState(0);
    const [achievements, setAchievements] = useState<Array<IAchievement | null>>([]);

    useEffect(() => {
        socket?.on("achievements", (performedAchievements: Array<IAchievement | null>) => {
            setAchievements((prevAchievements) => {
                const newAchievements = [
                    ...prevAchievements,
                    ...(prevAchievements.length < 5 && prevAchievements.length > 0 ? (
                        Array.from({ length: 5 - prevAchievements.length }, () => null)
                    ) : (
                        []
                    )),
                    ...performedAchievements];
                return newAchievements;
            });
            if (achievements.length === 0) {
                setStart(animKey + 1);
                setAnimKey(animKey + 1);
                SoundEffect.play("achievement");
            }
        })

        return () => {
            socket?.off("achievements");
        }
    }, [socket, achievements]);

    useEffect(() => {
        const timeout = setInterval(() => {
            setAchievements((prevAchievements) => {
                if(prevAchievements.length <= 5){
                    clearInterval(timeout);
                }
                const newAchievements = prevAchievements.slice(5);
                return newAchievements;
            });
            setAnimKey(prev => prev + 1);
        }, 9000);

        return () => {
            clearInterval(timeout);
        }

    }, [start]);

    return <div id="achievements" key={animKey}>
        {
            achievements.length > 0 && achievements.map((achievement, index) => {
                if (index < 5) {
                    return achievement && <Achievement key={index} achievement={achievement} />
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
        <img className="achievementIcon" src={`http://localhost:3000/assets/${achievement.icon}`} alt="Achievement Icon" draggable={false} />
    </div>
}