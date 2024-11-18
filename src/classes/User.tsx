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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.loginToken}`
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                stayLoggedIn: stayLoggedIn
            })
        };
        try {
            const response = await fetch("https://localhost:3000/user/register", options);
            const data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(err)
        }
    }

    async guestLogin() {
        try {
            const response = await fetch("https://localhost:3000/user/login");
            const data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(err)
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
            const response = await fetch("https://localhost:3000/user/login", options);
            const data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(err)
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
            const response = await fetch("https://localhost:3000/user/login", options);
            const data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(err)
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
            const response = await fetch("https://localhost:3000/user/login", options);
            const data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(err)
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
            const response = await fetch("https://localhost:3000/user/password", options);
            const data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(err)
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
            const response = await fetch("https://localhost:3000/user/password", options);
            const data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(err)
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
            const response = await fetch("https://localhost:3000/user/settings", options);
            const data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(err)
        }
    }

    async changeSettings(settings: Settings) {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.loginToken}`
            },
            body: JSON.stringify(settings)
        };
        try {
            const response = await fetch(`https://localhost:3000/user/settings/${settings.id}`, options);
            const data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(err)
        }
    }

    async getStats(){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.loginToken}`
            }
        };
        try {
            const response = await fetch("https://localhost:3000/user/stats", options);
            const data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(err)
        }
    }

    async getCollection(){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.loginToken}`
            }
        };
        try {
            const response = await fetch("https://localhost:3000/user/collection", options);
            const data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(err)
        }
    }

    async changeProfilePics(profilePicture: number, profileBorder: number) {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.loginToken}`
            },
            body: JSON.stringify({
                profilePicture: profilePicture,
                profileBorder: profileBorder
            })
        };
        try {
            const response = await fetch(`https://localhost:3000/user/profile`, options);
            const data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(err)
        }
    }

    async getGamemodes(type: 'singleplayer' | 'multiplayer'){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.loginToken}`
            }
        };
        try {
            const response = await fetch(`https://localhost:3000/game/${type}`, options);
            const data = await response.json();
            return { data: data, response: response };
        } catch (err: any) {
            error.setError(err)
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