import { error } from "./Error"

interface UserData {
    username: string | null,
    loginToken: string | null,
    stayLogin: boolean | null,
    profilePicture: ProfileImage | null,
    profileBorder: ProfileImage | null,
    settings: Settings | null
}

interface ProfileImage {
    id: string,
    name: string,
    src: string
}

interface Settings {
    volume: number;
    imagesSize: number;
    isSet: boolean;
    controls: Controls;
}

interface Controls {
    isTapMode: boolean;
    copy: string;
    remove: string;
    teableMapping: string[];
}

class User implements UserData {
    username: string | null = null;
    loginToken: string | null = null;
    stayLogin: boolean | null = null;
    profilePicture: ProfileImage | null = null;
    profileBorder: ProfileImage | null = null;
    settings: Settings | null = null;

    saveUser(userData: UserData) {
        this.username = userData.username;
        this.loginToken = userData.loginToken;
        this.profilePicture = userData.profilePicture;
        this.profileBorder = userData.profileBorder;
        this.save()
    }

    saveSettings(settings: Settings) {
        this.settings = settings
        this.save()
    }

    private save() {
        let storage = sessionStorage
        if (this.stayLogin) {
            storage = localStorage
        }

        Object.entries(this).forEach(([key, value]) => {
            storage.setItem(key, JSON.stringify(value));
        });
    }

    loadUser() {
        this.username = localStorage.getItem("username");
        this.loginToken = localStorage.getItem("loginToken");
        this.profilePicture = localStorage.getItem("profilePicture") ? JSON.parse(localStorage.getItem("profilePicture")!) : null;
        this.profileBorder = localStorage.getItem("profileBorder") ? JSON.parse(localStorage.getItem("profileBorder")!) : null;
        this.settings = localStorage.getItem("settings") ? JSON.parse(localStorage.getItem("settings")!) : null;
    }

    async register(username: string, email: string, password: string, stayLogin: boolean) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                stayLogin: stayLogin
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

    async login(username: string, password: string, stayLogin: boolean) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                stayLogin: stayLogin
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
        this.profilePicture = null;
        this.profileBorder = null;
        localStorage.clear()
        sessionStorage.clear()
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
            const response = await fetch("https://localhost:3000/settings", options);
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

    get StayLogin() {
        return this.stayLogin;
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