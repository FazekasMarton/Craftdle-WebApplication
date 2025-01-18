import { useEffect, useState } from "react";
import { store } from "../../app/store";
import { getCollection } from "../../features/user/dataRequestSlice";
import { StoneButton } from "../../components/StoneButton";
import { Achievement } from "../../components/Achievement";
import xp from "../../assets/imgs/backgrounds/experience_bar_progress.png";

interface ICollection {
    inventory: Array<{
        id: number;
        name: string;
        src: string;
        collected: boolean;
    }>;
    profilePicture: Array<{
        id: number;
        name: string;
        src: string;
        collected: boolean;
    }>;
    profileBorder: Array<{
        id: number;
        name: string;
        src: string;
        collected: boolean;
    }>;
    achievement: Array<{
        title: string;
        description: string;
        icon: string;
        progress: number;
        goal: number;
        rarity: number;
    }>;
}

export function Collection() {
    const [collection, setCollection] = useState<ICollection | null>(null);

    async function getUserCollection() {
        let response = await store.dispatch(getCollection())
        let res = (response.payload as any)
        if (res.response) {
            setCollection(res.data.data)
        }
    }

    useEffect(() => {
        getUserCollection()
    }, []);

    console.log(collection)

    return <div id="collection">
        <header id="collectionHeader">
            <nav>
                <StoneButton href="/">Back to Menu</StoneButton>
            </nav>
            <h1>Collection</h1>
        </header>
        <main id="collectionMain">
            <div id="collectionContainer">
                <section id="collectionProfilePicture">
                    <h2>Profile Pictures</h2>
                    <article>
                        {
                            collection?.profilePicture.map((item, index) => {
                                return <div className={`itemFrame ${item.collected ? "" : "uncollectedItem"}`} key={index}>
                                    <img src={`http://localhost:3000/profilePictures/${item.src}`} alt={item.name} draggable={false} />
                                </div>
                            })
                        }
                    </article>
                </section>
                <section id="collectionProfileBorder">
                    <h2>Profile Borders</h2>
                    <article>
                        {
                            collection?.profileBorder.map((item, index) => {
                                return <div className={`itemFrame ${item.collected ? "" : "uncollectedItem"}`} key={index}>
                                    <img src={`http://localhost:3000/profileBorders/${item.src}`} alt={item.name} draggable={false} />
                                </div>
                            })
                        }
                    </article>
                </section>
                <section id="collectionInventory">
                    <h2>Inventory</h2>
                    <article>
                        {
                            collection?.inventory.map((item, index) => {
                                return <div className={`itemFrame ${item.collected ? "" : "uncollectedItem"}`} key={index}>
                                    <img src={`http://localhost:3000/items/${item.src}`} alt={item.name} draggable={false} />
                                </div>
                            })
                        }
                    </article>
                </section>
                <section id="collectionAchievements">
                    <h2>Achievements</h2>
                    <article>
                        {
                            collection?.achievement.map((achievement, index) => {
                                return <div className={achievement.goal === achievement.progress ? "" : "uncollectedItem"} key={index}>
                                    <Achievement key={index} achievement={achievement} />
                                    <div className="progressBar">
                                        <img className="xp" src={xp} alt="xp" style={{
                                            clipPath: `inset(0 ${100 - (achievement.progress / achievement.goal) * 100}% 0 0)`
                                        }}/>
                                    </div>
                                </div>
                            })
                        }
                    </article>
                </section>
            </div>
        </main>
    </div >
}