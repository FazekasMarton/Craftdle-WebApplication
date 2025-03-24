import { createBrowserRouter, Navigate, Outlet, RouteObject } from "react-router-dom"
import { Info } from "../components/Info"
import { isUserPlayingOnPC } from "./isUserPlayingOnPC"
import { Error } from "../components/Error"
import { Achievements } from "../components/Achievement"
import { isTestSubdomain } from "./isTestSubdomain"
import testRealmTitle from "../assets/imgs/title/test_realm_title.png"
import { Meta } from "../components/Meta"
import { MainMenu } from "../pages/MainMenu/MainMenu"
import { Gamemodes } from "../pages/Gamemodes/Gamemodes"
import { Game } from "../pages/Game/Game"
import { PatchNotes } from "../pages/PatchNotes/PatchNotes"
import { Credits } from "../pages/Credits/Credits"
import { Docs } from "../pages/Docs/Docs"
import { Guide } from "../pages/Guide/Guide"
import { Collection } from "../pages/Collection/Collection"
import { Stats } from "../pages/Stats/Stats"
import { Settings } from "../pages/Settings/Settings"
import { Maintenance } from "../pages/Maintenance/Maintenance"
import { IMaintenance } from "../interfaces/IMaintenance"

/**
 * Generates the router configuration for the Craftdle application.
 * - Handles general routes for all users.
 * - Adds exclusive routes for logged-in users.
 * - Provides a maintenance mode router when the application is under maintenance.
 * 
 * @param isGuest - Indicates if the user is a guest.
 * @param maintenance - Maintenance state and countdown information.
 * @returns The configured router.
 */
export function getRouter(isGuest: boolean, maintenance: IMaintenance) {
    return maintenance.started && maintenance.countdown ? (
        getMaintenanceRouter()
    ) : (
        createBrowserRouter([
            {
                path: "/",
                element: <>
                    {isUserPlayingOnPC() ? <Info /> : null}
                    <Error />
                    <Achievements />
                    <Outlet />
                    {isTestSubdomain() && <img id="testWatermark" src={testRealmTitle} alt="Test Watermark" />}
                </>,
                children: [
                    ...getGeneralRoutes(),
                    ...(isGuest ? [] : getExclusiveRoutes())
                ]
            }
        ])
    )
}

/**
 * Returns the general routes accessible to all users.
 * 
 * @returns An array of RouteObject for general routes.
 */
function getGeneralRoutes(): RouteObject[] {
    return [
        {
            element: <>
                <Meta />
                <MainMenu />
            </>,
            index: true
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
            path: "*",
            element: <Navigate to="/" />
        }
    ]
}

/**
 * Returns the exclusive routes accessible only to logged-in users.
 * 
 * @returns An array of RouteObject for exclusive routes.
 */
function getExclusiveRoutes(): RouteObject[] {
    return [
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
            path: "settings",
            element: <>
                <Meta
                    title="Settings"
                    description="Customize your game settings in Craftdle, including controls, audio, and icon sizes for a personalized experience on PC or mobile."
                    keywords="Craftdle, Game Settings, Controls, Audio, Icon Size, Customize Appearance, Game Preferences, Minecraft Puzzle Settings, Guideian Angel"
                />
                <Settings />
            </>
        }
    ]
}

/**
 * Returns the router configuration for maintenance mode.
 * 
 * @returns A createBrowserRouter instance for maintenance mode.
 */
function getMaintenanceRouter() {
    return createBrowserRouter([
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
}