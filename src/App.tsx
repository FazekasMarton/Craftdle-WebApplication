import { Navigate, RouterProvider } from "react-router"
import { BrowserRouter, createBrowserRouter } from "react-router-dom"
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

const normalRouter = createBrowserRouter([
    {
        path: "/",
        element: <MainMenu />,
        index: true
    },
    {
        path: "settings",
        element: <Settings />
    },
    {
        path: "singleplayer",
        element: <Gamemodes type="singleplayer" />
    },
    {
        path: "play",
        element: <Game />
    },
    {
        path: "patchNotes",
        element: <PatchNotes />
    },
    {
        path: "credits",
        element: <Credits />
    },
    {
        path: "docs",
        element: <Docs />
    },
    {
        path: "*",
        element: <Navigate to="/" />
    },
])

const maintenanceRouter = createBrowserRouter([
    {
        path: "/",
        element: <Maintenance />,
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
            <Info />
            <BrowserRouter>
                <Error />
            </BrowserRouter>
        </>
    )
}

export default App