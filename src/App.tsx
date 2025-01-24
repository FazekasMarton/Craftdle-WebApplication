import { Navigate, Outlet, RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom"
import { MainMenu } from "./pages/MainMenu/MainMenu"
import { Settings } from "./pages/Settings/Settings"
import { Info } from "./components/Info"
import { Gamemodes } from "./pages/Gamemodes/Gamemodes"
import { Game } from "./pages/Game/Game"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState, store } from "./app/store"
import { loadUser, saveUser } from "./features/user/userSlice"
import { guestLogin, tokenLogin } from "./features/user/dataRequestSlice"
import { loadSettings } from "./functions/loadSettings"
import { connectSocket } from "./functions/connectSocket"
import { PatchNotes } from "./pages/PatchNotes/PatchNotes"
import { Credits } from "./pages/Credits/Credits"
import { IMaintenance } from "./interfaces/IMaintenance"
import { Maintenance } from "./pages/Maintenance/Maintenance"
import { setMaintenance } from "./features/maintenance/maintenanceSlice"
import { Docs } from "./pages/Docs/Docs"
import { Error } from "./components/Error"
import { isUserPlayingOnPC } from "./functions/isUserPlayingOnPC"
import { Guide } from "./pages/Guide/Guide"
import { Meta } from "./components/Meta"
import { Collection } from "./pages/Collection/Collection"
import { Stats } from "./pages/Stats/Stats"

const normalRouter = createBrowserRouter([
    {
        path: "/",
        element: <>
            {isUserPlayingOnPC() ? <Info /> : null}
            <Error />
            <Outlet />
        </>,
        children: [
            {
                element: <>
                    <Meta />
                    <MainMenu />
                </>,
                index: true
            },
            {
                path: "settings",
                element: <>
                    <Meta
                        title="Settings"
                        description="Customize your game settings in Craftdle, including controls, audio, and icon sizes for a personalized experience on PC or mobile."
                        keywords="Craftdle, Game Settings, Controls, Audio, Icon Size, Customize Appearance, Game Preferences, Minecraft Puzzle Settings, Guideian Angel"
                    />
                    <Settings />
                </>
            },
            {
                path: "singleplayer",
                element: <>
                    <Meta
                        title="Singleplayer"
                        description="Explore the singleplayer gamemodes in Craftdle! Test your crafting knowledge in unique puzzles designed for solo play. Play now on PC or mobile."
                        keywords="Minecraft, Wordle, Singleplayer, Craftdle Singleplayer, Solo Minecraft Puzzles, Crafting Challenges, Guideian Angel, Minecraft Wordle"
                    />
                    <Gamemodes type="singleplayer" />
                </>
            },
            {
                path: "play",
                element: <Game />
            },
            {
                path: "patchNotes",
                element: <>
                    <Meta
                        title="Patch Notes"
                        description="Stay up-to-date with the latest updates in Craftdle! Read the patch notes to learn about new features, bug fixes, and improvements in the game."
                        keywords="Craftdle, Patch Notes, Updates, Game Changes, New Features, Bug Fixes, Game Improvements, Guideian Angel"
                    />
                    <PatchNotes />
                </>
            },
            {
                path: "credits",
                element: <>
                    <Meta
                        title="Credits"
                        description="Meet the team behind Craftdle! Learn about the developers, artists, and contributors who helped create the game. Play now on PC or mobile."
                        keywords="Craftdle, Credits, Developers, Artists, Contributors, Game Creators, Game Designers, Guideian Angel"
                    />
                    <Credits />
                </>
            },
            {
                path: "docs",
                element: <>
                    <Meta
                        title="Privacy Policy & Terms of Use"
                        description="Review Craftdle's Privacy Policy and Terms of Use. Learn how we protect your data and the rules you agree to when using our game."
                        keywords="Craftdle, Privacy Policy, Terms of Use, Game Rules, Data Protection, User Agreement, Minecraft Puzzle Game, Guideian Angel"
                    />
                    <Docs />
                </>
            },
            {
                path: "guide",
                element: <>
                    <Meta
                        title="How to Play"
                        description="Learn how to play Craftdle! Read the guide to understand the game mechanics, controls, and strategies for solving puzzles. Play now on PC or mobile."
                        keywords="Craftdle, How to Play, Game Guide, Game Mechanics, Controls, Strategies, Puzzle Solving, Crafting Game, Guideian Angel"
                    />
                    <Guide />
                </>
            },
            {
                path: "collection",
                element: <>
                    <Meta
                        title="Collection"
                        description="View your collection in Craftdle! Track your progress, view your achievements, and explore the puzzles you've completed. Play now on PC or mobile."
                        keywords="Craftdle, Collection, Achievements, Progress, Puzzles, Crafting Game, Puzzle Game, Guideian Angel"
                    />
                    <Collection />
                </>
            },
            {
                path: "stats",
                element: <>
                    <Meta
                        title="Player Stats and Achievements - Craftdle"
                        description="Explore your personal game statistics, including your achievements, progress in different gamemodes, high scores, and overall performance in Craftdle."
                        keywords="Craftdle, Player Stats, Achievements, Game Progress, High Scores, Player Performance, Craftdle Achievements, Game Stats, Milestones, Puzzle Game Performance, Crafting Game Stats, Guideian Angel"
                    />
                    <Stats />
                </>
            },
            {
                path: "*",
                element: <Navigate to="/" />
            },
        ]
    }
])

const maintenanceRouter = createBrowserRouter([
    {
        path: "/",
        element: <>
            <Meta
                title="Maintenance"
                description="Craftdle is currently undergoing maintenance. Please check back later for updates. We apologize for any inconvenience."
                keywords="Craftdle, Maintenance, Game Updates, Game Improvements, Game Downtime, Game Changes, Guideian Angel"
            />
            <Maintenance />
        </>,
        index: true
    },
    {
        path: "*",
        element: <Navigate to="/" />
    },
])

async function autoLogin(token: string | null) {
    let error = true
    if (token) {
        let response = await store.dispatch(tokenLogin())
        let res = (response.payload as any)
        if (res.response) {
            await store.dispatch(saveUser(res.data.data))
            error = false
        }
    }
    if (error) {
        let response = await store.dispatch(guestLogin())
        let res = (response.payload as any)
        await store.dispatch(saveUser(res.data.data))
    }
    await loadSettings()
}

function App() {
    const user = useSelector((state: RootState) => state.user);
    const socket = useSelector((state: RootState) => state.socket.socket);
    const maintenance = useSelector((state: RootState) => state.maintenance);

    async function loadSavedUser() {
        await store.dispatch(loadUser());
        const token = store.getState().user.loginToken;
        await autoLogin(token);
        connectSocket()
    }

    useEffect(() => {
        if (!user.username) {
            loadSavedUser()
        }
    }, [])

    useEffect(() => {
        socket?.on("maintenance", (maintenanceData: IMaintenance) => {
            store.dispatch(setMaintenance(maintenanceData))
        })
    }, [socket])

    return (
        <>
            <RouterProvider router={maintenance.started && maintenance.countdown ? maintenanceRouter : normalRouter} />
        </>
    )
}

export default App