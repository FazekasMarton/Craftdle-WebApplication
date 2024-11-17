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
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                stayLoggedIn: stayLoggedIn
            })
        };
        try {
            const response = await fetch("https://localhost:3000/register", options);
            let data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(503, "Service Unavailable", "Failed to connect to the server. Please try again later.")
        }
    }

    async guestLogin() {
        try {
            const response = await fetch("https://localhost:3000/login");
            let data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(503, "Service Unavailable", "Failed to connect to the server. Please try again later.")
        }
    }

    async tokenLogin() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.loginToken}`
            }
        };
        try {
            const response = await fetch("https://localhost:3000/login", options);
            let data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(503, "Service Unavailable", "Failed to connect to the server. Please try again later.")
        }
    }

    async login(username: string, password: string, stayLoggedIn: boolean) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                stayLoggedIn: stayLoggedIn
            })
        };
        try {
            const response = await fetch("https://localhost:3000/login", options);
            let data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(503, "Service Unavailable", "Failed to connect to the server. Please try again later.")
        }
    }

    async logout() {
        const auth = btoa(`${this.username}:${this.loginToken}`)
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        };
        try {
            const response = await fetch("https://localhost:3000/login", options);
            let data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(503, "Service Unavailable", "Failed to connect to the server. Please try again later.")
        }
    }

    clear() {
        this.username = null;
        this.loginToken = null;
        this.stayLoggedIn = false;
        this.profilePicture = null;
        this.profileBorder = null;
        this.settings = null;
        localStorage.clear;
        sessionStorage.clear;
    }

    async forgotPassword(email: string) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        };
        try {
            const response = await fetch("https://localhost:3000/password", options);
            let data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(503, "Service Unavailable", "Failed to connect to the server. Please try again later.")
        }
    }

    async changePassword(password: string) {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password
            })
        };
        try {
            const response = await fetch("https://localhost:3000/password", options);
            let data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(503, "Service Unavailable", "Failed to connect to the server. Please try again later.")
        }
    }

    async getSettings() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.loginToken}`
            }
        };
        try {
            const response = await fetch("https://localhost:3000/settings", options);
            let data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(503, "Service Unavailable", "Failed to connect to the server. Please try again later.")
        }
    }

    async changeSettings(settings: Settings) {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        };
        try {
            const response = await fetch(`https://localhost:3000/settings/${settings.id}`, options);
            let data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(503, "Service Unavailable", "Failed to connect to the server. Please try again later.")
        }
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