import { RouterProvider } from "react-router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState, store } from "./app/store"
import { clearUser, loadUser, saveUser, setInstalled } from "./features/user/userSlice"
import { guestLogin, tokenLogin } from "./features/user/dataRequestSlice"
import { loadSettings } from "./functions/loadSettings"
import { connectSocket } from "./functions/connectSocket"
import { IMaintenance } from "./interfaces/IMaintenance"
import { setMaintenance } from "./features/maintenance/maintenanceSlice"
import { BeforeInstallPromptEvent } from "./interfaces/IBeforeInstallPromptEvent"
import { setError } from "./features/error/errorSlice"
import { IResponse, IUser } from "./interfaces/IResponse"
import { getRouter } from "./functions/getRouter"

declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}

/**
 * Automatically logs in the user using a token or as a guest if no token is found.
 * @param token - The login token for the user.
 */
async function autoLogin(token: string | null) {
    try {
        if (token) {
            const response = await store.dispatch(tokenLogin())
            const res = (response.payload as IResponse)
            if (res.response) {
                await store.dispatch(saveUser(res.data.data as IUser))
                await loadSettings()
            }
        } else {
            throw new Error("No token found");
        }
    } catch {
        await store.dispatch(clearUser(true))
        const response = await store.dispatch(guestLogin())
        const res = (response.payload as IResponse)
        await store.dispatch(saveUser(res.data.data as IUser))
    }
}

/**
 * Main application component that handles routing, user state, and maintenance mode.
 * @returns The App component.
 */
export function App() {
    const user = useSelector((state: RootState) => state.user);
    const socket = useSelector((state: RootState) => state.socket.socket);
    const maintenance = useSelector((state: RootState) => state.maintenance);

    /**
     * Loads the saved user from the Redux store, attempts to log in automatically using a token,
     * and initializes the socket connection. If no valid token is found, the user is logged in as a guest.
     * This function ensures that the user state and socket connection are properly initialized.
     */
    async function loadSavedUser() {
        await store.dispatch(loadUser()); // Load user data from the Redux store
        const token = store.getState().user.loginToken; // Retrieve the login token from the state
        await autoLogin(token); // Attempt automatic login with the token
        connectSocket(); // Establish the socket connection
    }

    useEffect(() => {
        // Load user data on initial render if no username is present.
        if (!user.username) {
            loadSavedUser()
        }
    }, [user.username])

    useEffect(() => {
        // Handle socket events for maintenance, errors, and disconnections.
        socket?.on("maintenance", (maintenanceData: IMaintenance) => {
            store.dispatch(setMaintenance(maintenanceData))
        })

        socket?.on("error", (error: string) => {
            if (error == "UnauthorizedError") {
                store.dispatch(clearUser(true))
            }
            store.dispatch(setError(error))
        })

        socket?.on("disconnect", (r: string) => {
            if (store.getState().error.name != "Unauthorized") {
                store.dispatch(setError(r == "io client disconnect" || r == "io server disconnect" ? "SessionTakeover" : "ConnectionError"))
            }
        })

        return () => {
            socket?.off("maintenance")
            socket?.off("disconnect")
            socket?.off("error")
        }
    }, [socket])

    useEffect(() => {
        // Handle the "beforeinstallprompt" event for PWA installation.
        const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();

            const isSupported = 'serviceWorker' in navigator || 'beforeinstallprompt' in window;
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
            const isIOSStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

            const isAvailable = isSupported && !isStandalone && !isIOSStandalone
            store.dispatch(setInstalled(isAvailable ? e : null));
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    // Determine the router to use based on maintenance and user state.
    const router = getRouter(user.isGuest, maintenance)

    return (
        <>
            {/* Render the router provider with the selected router */}
            <RouterProvider key={String(maintenance.started)} router={router} />
        </>
    )
}

export default App