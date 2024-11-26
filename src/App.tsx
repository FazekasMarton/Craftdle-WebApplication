import { Navigate, RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom"
import { MainMenu } from "./pages/MainMenu/MainMenu"
import { Settings } from "./pages/Settings/Settings"

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
        path: "*",
        element: <Navigate to="/" />
    },
])

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App