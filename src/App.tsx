import { Navigate, RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom"
import { MainMenu } from "./pages/MainMenu/MainMenu"
import { Settings } from "./pages/Settings/Settings"
import { Info } from "./components/Info"
import { Gamemodes } from "./pages/Gamemodes/Gamemodes"

const router = createBrowserRouter([
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
        path: "*",
        element: <Navigate to="/" />
    },
])

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <Info />
        </>
    )
}

export default App