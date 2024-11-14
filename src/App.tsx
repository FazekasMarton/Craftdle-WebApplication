import { RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom"
import { MainMenu } from "./pages/MainMenu/MainMenu"

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainMenu/>
    }
])

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App