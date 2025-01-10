import { Navigate, RouterProvider } from "react-router"
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
import { Socket } from "socket.io-client"
import { connectSocket } from "./functions/connectSocket"

let socket: Socket | null = null

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainMenu socket={socket} />,
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

    async function loadSavedUser() {
        await store.dispatch(loadUser());
        const token = store.getState().user.loginToken;
        await autoLogin(token);
        socket?.disconnect()
        connectSocket(socket)
    }

    useEffect(() => {
        if (!user.username) {
            loadSavedUser()
        }
    }, [])

    return (
        <>
            <RouterProvider router={router} />
            <Info />
        </>
    )
}

export default App