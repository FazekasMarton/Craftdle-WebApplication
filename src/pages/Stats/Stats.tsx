import { useEffect, useState } from "react"
import { IProfileImage } from "../../interfaces/IProfileImage"
import { RootState, store } from "../../app/store"
import { getStats } from "../../features/user/dataRequestSlice"
import { StoneButton } from "../../components/StoneButton"
import { useSelector } from "react-redux"

/**
 * Interface for collection statistics.
 */
interface ICollectStat {
    collected: number
    collectable: number
}

/**
 * Interface for user statistics.
 */
interface IStats {
    username: string
    profilePicture: IProfileImage
    profileBorder: IProfileImage
    streak: number
    gamemodes: Array<{
        gamemodeName: string
        played: number
        solved: number
        fastestSolve: number | null
        color: string
    }>
    registrationDate: string
    performedAchievements: ICollectStat
    collectedRecipes: ICollectStat
}

/**
 * Stats component to display user statistics.
 * @returns The Stats component.
 */
export function Stats() {
    const user = useSelector((state: RootState) => state.user);
    const [stats, setStats] = useState<IStats | null>(null)
    const gameStats = {
        totalSolved: 0,
        totalPlayed: 0
    }

    /**
     * Fetch the user's statistics from the server.
     */
    async function getUserStats() {
        let response = await store.dispatch(getStats())
        let res = (response.payload as any)
        if (res.response) {
            setStats(res.data.data)
        }
    }

    useEffect(() => {
        getUserStats()
    }, [user])

    return <div id="stats">
        <header id="statsHeader">
            <nav>
                <StoneButton href="/">Back to Menu</StoneButton>
            </nav>
            <h1>Statistic</h1>
        </header>
        <main id="statsMain">
            <section className="account">
                <div className="profileBorder"
                    style={stats?.profileBorder ? {
                        backgroundImage: `url(http://localhost:3000/assets/profileBorders/${stats?.profileBorder?.src})`
                    } : {}}
                >
                    {stats?.profilePicture ? <img className="profilePicture" src={`http://localhost:3000/assets/profilePictures/${stats?.profilePicture?.src}`} alt={stats?.profilePicture?.name} draggable={false}/> : null}
                </div>
                <h2 className="profileName">{stats?.username}</h2>
            </section>
            <div>
                <section id="basicStats">
                    <h3>Basic Stats</h3>
                    <article>
                        <p>Streak: {stats?.streak}</p>
                        <p>Registration Date: {stats?.registrationDate}</p>
                        <p>Performed Achievements: {stats?.performedAchievements?.collected}/{stats?.performedAchievements?.collectable}</p>
                        <p>Collected Recipes: {stats?.collectedRecipes?.collected}/{stats?.collectedRecipes?.collectable}</p>
                    </article>
                </section>
                <section id="gamemodeStats">
                    <h3>Gamemode Stats</h3>
                    <article>
                        {
                            stats?.gamemodes?.map(gamemode => {
                                gameStats.totalSolved += gamemode.solved
                                gameStats.totalPlayed += gamemode.played
                                return <div key={gamemode.gamemodeName}>
                                    <h4 style={{ color: `#${gamemode.color}` }}>{gamemode.gamemodeName}</h4>
                                    <ul>
                                        <li>Played: {gamemode.played}</li>
                                        <li>Solved: {gamemode.solved}</li>
                                        {gamemode.played ? <li>Win Rate: {Math.round(gamemode.solved / gamemode.played * 100)}%</li> : null}
                                        {gamemode.fastestSolve ? <li>Fastest Solve: {gamemode.fastestSolve}</li> : null}
                                    </ul>
                                </div>
                            })
                        }
                        <p>Total played: {gameStats.totalPlayed}</p>
                        <p>Total solved: {gameStats.totalSolved}</p>
                        {gameStats.totalPlayed ? <p>Total win rate: {Math.round(gameStats.totalSolved / gameStats.totalPlayed * 100)}%</p> : null}
                    </article>
                </section>
            </div>
        </main>
    </div>
}