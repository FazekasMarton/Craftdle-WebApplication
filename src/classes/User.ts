import { Settings } from "../interfaces/Settings";
import { error } from "./Error"

interface UserData {
    username: string | null,
    loginToken: string | null,
    stayLoggedIn: boolean | null,
    profilePicture: ProfileImage | null,
    profileBorder: ProfileImage | null,
    settings: Settings[] | null
}

interface ProfileImage {
    id: string,
    name: string,
    src: string
}

class User implements UserData {
    username: string | null = null;
    loginToken: string | null = null;
    stayLoggedIn: boolean = false;
    profilePicture: ProfileImage | null = null;
    profileBorder: ProfileImage | null = null;
    settings: Settings[] | null = null;

    saveUser(username: string | null, loginToken: string | null, stayLoggedIn: boolean, profilePicture: ProfileImage | null, profileBorder: ProfileImage | null) {
        this.username = username;
        this.loginToken = loginToken;
        this.stayLoggedIn = stayLoggedIn;
        this.profilePicture = profilePicture;
        this.profileBorder = profileBorder;
        this.save()
    }

    saveSettings(settings: Settings[]) {
        this.settings = settings
        this.save()
    }

    private save() {
        let storage = this.stayLoggedIn ? localStorage : sessionStorage

        Object.entries(this).forEach(([key, value]) => {
            const storedValue = typeof value === 'object' ? JSON.stringify(value) : value;
            storage.setItem(key, storedValue);
        });
    }

    loadUser() {
        Object.keys(this).forEach((key) => {
            const storedValue = localStorage.getItem(key);
            if (storedValue) {
                try {
                    const parsedValue = JSON.parse(storedValue);
                    this[key as keyof this] = parsedValue;
                } catch {
                    this[key as keyof this] = storedValue as any;
                }
            }
        });
    }

    async register(username: string, email: string, password: string, stayLoggedIn: boolean) {
        return await this.communicate("https://localhost:3000/user/register", "POST", "Bearer", {
            username: username,
            email: email,
            password: password,
            stayLoggedIn: stayLoggedIn
        })
    }

    async guestLogin() {
        return await this.communicate("https://localhost:3000/user/login", "GET")
    }

    async tokenLogin() {
        return await this.communicate("https://localhost:3000/user/login", "POST", "Bearer")
    }

    async login(username: string, password: string, stayLoggedIn: boolean) {
        return await this.communicate("https://localhost:3000/user/login", "POST", undefined, {
            username: username,
            password: password,
            stayLoggedIn: stayLoggedIn
        })
    }

    async logout() {
        return await this.communicate("https://localhost:3000/user/login", "DELETE", "Basic")
    }

    clear() {
        this.username = null;
        this.loginToken = null;
        this.stayLoggedIn = false;
        this.profilePicture = null;
        this.profileBorder = null;
        this.settings = null;
        localStorage.clear();
        sessionStorage.clear();
    }

    async forgotPassword(email: string) {
        return await this.communicate("https://localhost:3000/user/password", "POST", "Bearer", { email: email })
    }

    async changePassword(password: string) {
        return await this.communicate("https://localhost:3000/user/password", "PUT", "Bearer", { password: password })
    }

    async getSettings() {
        return await this.communicate("https://localhost:3000/user/settings", "GET", "Bearer")
    }

    async changeSettings(settings: Settings) {
        return await this.communicate(`https://localhost:3000/user/settings/${settings.id}`, "PUT", "Bearer", settings)
    }

    async getStats() {
        return await this.communicate("https://localhost:3000/user/stats", "GET", "Bearer")
    }

    async getCollection() {
        return await this.communicate("https://localhost:3000/user/collection", "GET", "Bearer")
    }

    async changeProfilePics(profilePicture: number, profileBorder: number) {
        return await this.communicate("https://localhost:3000/user/profile", "PUT", "Bearer", {
            profilePicture: profilePicture,
            profileBorder: profileBorder
        })
    }

    async getGamemodes(type: 'singleplayer' | 'multiplayer') {
        return await this.communicate(`https://localhost:3000/game/${type}`, "GET", "Bearer")
    }

    private async communicate(url: string, method: "GET" | "POST" | "PUT" | "DELETE", auth?: "Basic" | "Bearer", body?: object) {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        if (auth) {
            headers['Authorization'] = this.getAuthorizationToken(auth);
        }
        const options: RequestInit = {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : undefined,
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(err);
            return null;
        }
    }

    private getAuthorizationToken(auth: "Basic" | "Bearer") {
        let tokens = {
            "Basic": `Basic ${btoa(`${this.username}:${this.loginToken}`)}`,
            "Bearer": `Bearer ${this.loginToken}`
        }
        return tokens[auth]
    }

    get Username() {
        return this.username;
    }

    get LoginToken() {
        return this.loginToken;
    }

    get StayLoggedIn() {
        return this.stayLoggedIn;
    }

    get ProfilePicture() {
        return this.profilePicture;
    }

    get ProfileBorder() {
        return this.profileBorder;
    }

    get Settings() {
        return this.settings;
    }
}

const user = new User();
export default user;