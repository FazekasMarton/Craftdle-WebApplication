import { useEffect, useState } from "react";
import { RootState, store } from "../../app/store";
import { changeProfilePics, getCollection } from "../../features/user/dataRequestSlice";
import { StoneButton } from "../../components/StoneButton";
import { Achievement } from "../../components/Achievement";
import active from "../../assets/imgs/icons/checkmark.png";
import lock from "../../assets/imgs/icons/lock.png";
import xp from "../../assets/imgs/backgrounds/experience_bar_progress.png";
import xpBar from "../../assets/imgs/backgrounds/experience_bar_background.png";
import { useSelector } from "react-redux";

/**
 * Interface for the collection data.
 */
interface ICollection {
    inventory: Array<{
        id: number;
        name: string;
        src: string;
        collected: boolean;
    }>;
    profilePictures: Array<{
        id: number;
        name: string;
        src: string;
        collected: boolean;
        active: boolean;
    }>;
    profileBorders: Array<{
        id: number;
        name: string;
        src: string;
        collected: boolean;
        active: boolean;
    }>;
    achievements: Array<{
        title: string;
        description: string;
        icon: string;
        progress: number;
        goal: number;
        rarity: number;
        collected: boolean;
    }>;
}

/**
 * Save profile changes to the store.
 * @param collection - The collection data.
 * @param setCollection - The function to update the collection state.
 */
function saveProfileChanges(collection: ICollection, setCollection: (value: ICollection) => void) {
    store.dispatch(changeProfilePics({
        profilePicture: collection.profilePictures.find((item) => item.active)?.id || 0,
        profileBorder: collection.profileBorders.find((item) => item.active)?.id || 0
    }))
    setCollection(collection)
}

function counter(list: Array<{collected: boolean}> | undefined){
    return `(${list?.filter((item) => item.collected).length || 0}/${list?.length || 0})`
}

/**
 * Collection component to display the user's collection of items, profile pictures, borders, and achievements.
 * @returns The Collection component.
 */
export function Collection() {
    const user = useSelector((state: RootState) => state.user);
    const [collection, setCollection] = useState<ICollection | null>(null);

    /**
     * Fetch the user's collection from the server.
     */
    async function getUserCollection() {
        let response = await store.dispatch(getCollection())
        let res = (response.payload as any)
        if (res.response) {
            setCollection(res.data.data)
        }
    }

    useEffect(() => {
        getUserCollection()
    }, [user]);

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
                    <h2>Profile Pictures {counter(collection?.profilePictures)}</h2>
                    <article>
                        {
                            collection?.profilePictures?.map((item, index) => {
                                return <div
                                    className={`itemFrame ${item.collected ? "" : "uncollectedItem"}`}
                                    key={index}
                                    onClick={() => {
                                        if (item.collected && !item.active) {
                                            collection.profilePictures.forEach((element) => {
                                                element.active = element.id === item.id
                                            })
                                            saveProfileChanges({ ...collection }, setCollection)
                                        }
                                    }}
                                >
                                    <img src={`http://localhost:3000/assets/profilePictures/${item.src}`} alt={item.name} draggable={false} />
                                    {
                                        item.collected ? (
                                            item.active ? (
                                                <img className="activeProfileImage" src={active} alt="Active Profile Picture" />
                                            ) : (
                                                <img className="activeableProfileImage" src={active} alt="Activeable Profile Picture" />
                                            )
                                        ) : (
                                            <img className="uncollectedProfileImage" src={lock} alt="Uncollected Profile Picture" />
                                        )
                                    }
                                </div>
                            })
                        }
                    </article>
                </section>
                <section id="collectionProfileBorder">
                    <h2>Profile Borders {counter(collection?.profileBorders)}</h2>
                    <article>
                        {
                            collection?.profileBorders?.map((item, index) => {
                                return <div
                                    className={`itemFrame ${item.collected ? "" : "uncollectedItem"}`}
                                    key={index}
                                    onClick={() => {
                                        if (item.collected && !item.active) {
                                            collection.profileBorders.forEach((element) => {
                                                element.active = element.id === item.id
                                            })
                                            saveProfileChanges({ ...collection }, setCollection)
                                        }
                                    }}
                                >
                                    <img src={`http://localhost:3000/assets/profileBorders/${item.src}`} alt={item.name} draggable={false} />
                                    {
                                        item.collected ? (
                                            item.active ? (
                                                <img className="activeProfileImage" src={active} alt="Active Profile Border" />
                                            ) : (
                                                <img className="activeableProfileImage" src={active} alt="Activeable Profile Border" />
                                            )
                                        ) : (
                                            <img className="uncollectedProfileImage" src={lock} alt="Uncollected Profile Border" />
                                        )
                                    }
                                </div>
                            })
                        }
                    </article>
                </section>
                <section id="collectionInventory">
                    <h2>Inventory {counter(collection?.inventory)}</h2>
                    <article>
                        {
                            collection?.inventory?.map((item, index) => {
                                return <div className={`itemFrame ${item.collected ? "" : "uncollectedItem"}`} key={index}>
                                    <img src={`http://localhost:3000/assets/items/${item.src}`} alt={item.name} draggable={false} />
                                    {
                                        !item.collected ? (
                                            <img className="uncollectedProfileImage" src={lock} alt="Uncollected Item" />
                                        ) : (
                                            null
                                        )
                                    }
                                </div>
                            })
                        }
                    </article>
                </section>
                <section id="collectionAchievements">
                    <h2>Achievements {counter(collection?.achievements)}</h2>
                    <article>
                        {
                            collection?.achievements?.map((achievement, index) => {
                                return <div className={achievement.progress && achievement.goal && achievement.goal === achievement.progress ? "" : "uncollectedItem"} key={index}>
                                    <Achievement key={index} achievement={achievement} />
                                    {achievement.goal && achievement.progress ? (
                                        <div className="progressBar">
                                            <img className="xpBar" src={xpBar} alt="XP bar" />
                                            <img className="xp" src={xp} alt="XP" style={{
                                                clipPath: `inset(0 ${100 - (achievement.progress / achievement.goal) * 100}% 0 0)`
                                            }} />
                                        </div>
                                    ) : null}
                                </div>
                            })
                        }
                    </article>
                </section>
            </div>
        </main>
    </div >
}