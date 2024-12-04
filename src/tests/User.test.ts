import { vi } from "vitest";
import { ISettings } from "../interfaces/ISettings";
import { faker } from "@faker-js/faker";
import { saveSettings, saveUser, clearUser, loadUser } from "../features/user/userSlice"
import { store } from "../app/store";
import { changePassword, changeProfilePics, changeSettings, forgotPassword, getCollection, getGamemodes, getSettings, getStats, guestLogin, login, logout, register, tokenLogin } from "../features/user/dataRequestSlice";

function getStorageMocker(storageType: "localStorage" | "sessionStorage") {
    const storage: Record<string, string> = {};

    const getItemMock = vi.fn((key: string) => storage[key] != undefined ? storage[key] : null);
    const setItemMock = vi.fn((key: string, value: string) => {
        storage[key] = value;
    });
    const removeItemMock = vi.fn((key: string) => {
        delete storage[key];
    });
    const clearMock = vi.fn(() => {
        Object.keys(storage).forEach(key => delete storage[key]);
    });

    Object.defineProperty(window, storageType, {
        value: {
            getItem: getItemMock,
            setItem: setItemMock,
            removeItem: removeItemMock,
            clear: clearMock,
            key: vi.fn((index: number) => Object.keys(storage)[index] || null),
            items: storage,
            length: Object.keys(storage).length,
        },
        writable: true,
    });

    return {
        getItemMock,
        setItemMock,
        removeItemMock,
        clearMock,
    };
}

function generateUser() {
    return {
        username: faker.person.fullName(),
        loginToken: faker.string.uuid(),
        isGuest: faker.datatype.boolean(),
        stayLoggedIn: faker.datatype.boolean(),
        profilePicture: generateImage(),
        profileBorder: generateImage(),
        email: `${faker.food.ethnicCategory()}@gmail.com`,
        password: faker.string.alphanumeric(16)
    }
}

function generateImage() {
    return {
        id: faker.string.uuid(),
        name: faker.string.alpha(10),
        src: faker.image.url()
    }
}

function generateSettings() {
    let settings = []
    for (let i = 0; i < 3; i++) {
        let mapping = []
        for (let i = 0; i < 9; i++) {
            mapping.push(faker.string.alphanumeric(1))
        }
        settings.push({
            id: i,
            volume: faker.number.int({ min: 0, max: 100 }),
            imagesSize: faker.number.int({ min: 0, max: 100 }),
            isSet: faker.datatype.boolean(),
            controls: {
                isTapMode: faker.datatype.boolean(),
                copy: faker.string.alphanumeric(1),
                remove: faker.string.alphanumeric(1),
                teableMapping: mapping
            }
        })
    }
    return settings
}

function getSuccceedFetchMocker(status: number, body: object) {
    const mockFetch = vi.fn(() =>
        Promise.resolve(
            new Response(
                JSON.stringify(body),
                {
                    status: status,
                    headers: { "Content-Type": "application/json" }
                }
            )
        )
    );
    global.fetch = mockFetch;
    return mockFetch
}

beforeEach(async () => {
    getStorageMocker("localStorage");
    getStorageMocker("sessionStorage");
});

afterEach(async () => {
    localStorage.clear();
    sessionStorage.clear()
    await store.dispatch(clearUser())
    vi.clearAllMocks();
});

describe('User Slice', () => {
    describe('Data controller functions', () => {
        describe('Update user', () => {
            it('should update user data correctly', () => {
                const randomUser = generateUser();
                store.dispatch(saveUser(randomUser));
                const state = store.getState().user;
                expect(state.username).toBe(randomUser.username);
                expect(state.loginToken).toBe(randomUser.loginToken);
                expect(state.isGuest).toBe(randomUser.isGuest);
                expect(state.stayLoggedIn).toBe(randomUser.stayLoggedIn);
                expect(state.profilePicture).toEqual(randomUser.profilePicture);
                expect(state.profileBorder).toEqual(randomUser.profileBorder);
            });

            it('should update user settings correctly', () => {
                const randomUser = generateUser();
                store.dispatch(saveUser(randomUser));
                const settings: ISettings[] = generateSettings();
                store.dispatch(saveSettings(settings));
                const state = store.getState().user;
                expect(state.settings).toEqual(settings);
            });
        })

        describe('Store in sessionStorage', () => {
            it('should store user data in sessionStorage', () => {
                const randomUser = generateUser();
                randomUser.stayLoggedIn = false
                store.dispatch(saveUser(randomUser));
                expect(sessionStorage.getItem("username")).toBe(randomUser.username);
                expect(sessionStorage.getItem("loginToken")).toBe(randomUser.loginToken);
                expect(sessionStorage.getItem("isGuest")).toBe(randomUser.isGuest);
                expect(sessionStorage.getItem("stayLoggedIn")).toBe(false);
                expect(sessionStorage.getItem("profilePicture")).toBe(JSON.stringify(randomUser.profilePicture));
                expect(sessionStorage.getItem("profileBorder")).toBe(JSON.stringify(randomUser.profileBorder));
            });

            it('should store user settings in sessionStorage', () => {
                const randomUser = generateUser();
                randomUser.stayLoggedIn = false
                store.dispatch(saveUser(randomUser));
                const settings: ISettings[] = generateSettings();
                store.dispatch(saveSettings(settings));
                expect(sessionStorage.getItem("settings")).toBe(JSON.stringify(settings));
            });
        })

        describe('Store in localStorage', () => {
            it('should store user data in localStorage', () => {
                const randomUser = generateUser();
                randomUser.stayLoggedIn = true
                store.dispatch(saveUser(randomUser));
                expect(localStorage.getItem("username")).toBe(randomUser.username);
                expect(localStorage.getItem("loginToken")).toBe(randomUser.loginToken);
                expect(localStorage.getItem("isGuest")).toBe(randomUser.isGuest);
                expect(localStorage.getItem("stayLoggedIn")).toBe(true);
                expect(localStorage.getItem("profilePicture")).toBe(JSON.stringify(randomUser.profilePicture));
                expect(localStorage.getItem("profileBorder")).toBe(JSON.stringify(randomUser.profileBorder));
            });
            
            it('should store user settings in localStorage', () => {
                const randomUser = generateUser();
                randomUser.stayLoggedIn = true
                store.dispatch(saveUser(randomUser));
                const settings: ISettings[] = generateSettings();
                store.dispatch(saveSettings(settings));
                expect(localStorage.getItem("settings")).toBe(JSON.stringify(settings));
            });
        })

        it('should clear user data', async () => {
            const randomUser = generateUser();
            store.dispatch(saveUser(randomUser));
            const settings: ISettings[] = generateSettings();
            store.dispatch(saveSettings(settings));
            await store.dispatch(clearUser());
            const updatedState = store.getState().user;
            expect(updatedState.username).toBeNull();
            expect(updatedState.loginToken).toBeNull();
            expect(updatedState.isGuest).toBe(false);
            expect(updatedState.stayLoggedIn).toBe(false);
            expect(updatedState.profilePicture).toBeNull();
            expect(updatedState.profileBorder).toBeNull();
            expect(updatedState.settings).toBeNull();
        });
        

        describe('Load data from localStorage', () => {
            it('should load user data from localStorage', () => {
                const randomUser = generateUser();
                randomUser.stayLoggedIn = true
                store.dispatch(saveUser(randomUser));
                const settings: ISettings[] = generateSettings();
                store.dispatch(saveSettings(settings));
                store.dispatch(clearUser());
                store.dispatch(loadUser());
                const state = store.getState().user;
                expect(state.username).toBe(randomUser.username);
                expect(state.loginToken).toBe(randomUser.loginToken);
                expect(state.isGuest).toBe(randomUser.isGuest);
                expect(state.stayLoggedIn).toBe(true);
                expect(state.profilePicture).toEqual(randomUser.profilePicture);
                expect(state.profileBorder).toEqual(randomUser.profileBorder);
                expect(state.settings).toEqual(settings);
            });

            it('should load no data from localStorage', async () => {
                await store.dispatch(loadUser());
                const state = store.getState().user;
                expect(state.username).toBeNull();
                expect(state.loginToken).toBeNull();
                expect(state.isGuest).toBe(false);
                expect(state.stayLoggedIn).toBe(false);
                expect(state.profilePicture).toBeNull();
                expect(state.profileBorder).toBeNull();
                expect(state.settings).toBeNull();
            });
        })
    });

    describe('Data request', () => {
        describe('Register', () => {
            it('should return data and response for a successful registration', async () => {
                const randomUser = generateUser();
                const fakeBody = {
                    loginToken: randomUser.loginToken,
                    username: randomUser.username,
                    profilePicture: randomUser.profilePicture,
                    profileBorder: randomUser.profileBorder,
                    stayLoggedIn: randomUser.stayLoggedIn
                };
                const mockFetch = getSuccceedFetchMocker(200, fakeBody);
                const result = await store.dispatch(register(randomUser));
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: randomUser.username,
                        email: randomUser.email,
                        password: randomUser.password,
                        stayLoggedIn: randomUser.stayLoggedIn
                    })
                });
                expect((result.payload as any).response).toBe(200);
                expect((result.payload as any).data).toEqual(fakeBody);
            });
        });

        describe('Guest Login', () => {
            it('should return data and response for a successful guest login', async () => {
                const fakeBody = {
                    loginToken: faker.string.uuid(),
                    username: "guestUser",
                    profilePicture: generateImage(),
                    profileBorder: generateImage(),
                };
                const mockFetch = getSuccceedFetchMocker(200, fakeBody);
                const result = await store.dispatch(guestLogin());
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/login", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                expect((result.payload as any).response).toBe(200);
                expect((result.payload as any).data).toEqual(fakeBody);
            });
        });

        describe('Token Login', () => {
            it('should return data and response for a successful token login', async () => {
                const randomUser = generateUser();
                randomUser.stayLoggedIn = true
                store.dispatch(saveUser(randomUser));
                const fakeBody = {
                    loginToken: faker.string.uuid(),
                    username: "tokenUser",
                    profilePicture: generateImage(),
                    profileBorder: generateImage(),
                };
                const mockFetch = getSuccceedFetchMocker(200, fakeBody);
                const result = await store.dispatch(tokenLogin());
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${randomUser.loginToken}`
                    },
                });
                expect((result.payload as any).response).toBe(200);
                expect((result.payload as any).data).toEqual(fakeBody);
            });
        });

        describe('Login', () => {
            it('should return data and response for a successful login', async () => {
                const randomUser = generateUser();
                const fakeBody = {
                    loginToken: randomUser.loginToken,
                    username: randomUser.username,
                    profilePicture: randomUser.profilePicture,
                    profileBorder: randomUser.profileBorder,
                    stayLoggedIn: randomUser.stayLoggedIn
                };
                const mockFetch = getSuccceedFetchMocker(200, fakeBody);
                const result = await store.dispatch(login(randomUser));
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/login", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: randomUser.username,
                        password: randomUser.password,
                        stayLoggedIn: randomUser.stayLoggedIn
                    })
                });
                expect((result.payload as any).response).toBe(200);
                expect((result.payload as any).data).toEqual(fakeBody);
            });
        });

        describe('Logout', () => {
            it('should successfully logout the user', async () => {
                const mockFetch = getSuccceedFetchMocker(200, { message: "Logout successful" });
                const randomUser = generateUser();
                store.dispatch(saveUser(randomUser));
                const auth = btoa(`${randomUser.username}:${randomUser.loginToken}`)
                const result = await store.dispatch(logout());
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/login", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${auth}`
                    }
                });
                expect((result.payload as any).response).toBe(200);
                expect((result.payload as any).data).toEqual({ message: "Logout successful" });
            });
        });

        describe('Forgot Password', () => {
            it('should return success message for a successful password reset request', async () => {
                const randomUser = generateUser();
                const fakeBody = { item: generateImage() };
                store.dispatch(saveUser(randomUser));
                const mockFetch = getSuccceedFetchMocker(200, fakeBody);
                const result = await store.dispatch(forgotPassword(randomUser.email));
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/password", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${randomUser.loginToken}`
                    },
                    body: JSON.stringify({ email: randomUser.email })
                });
                expect((result.payload as any).response).toBe(200);
                expect((result.payload as any).data).toEqual(fakeBody);
            });
        });

        describe('Change Password', () => {
            it('should return success message for a successful password change', async () => {
                const randomUser = generateUser();
                const fakeBody = { message: "Password updated successfully" };
                store.dispatch(saveUser(randomUser));
                const mockFetch = getSuccceedFetchMocker(200, fakeBody);
                const result = await store.dispatch(changePassword(randomUser.password));
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/password", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${randomUser.loginToken}`
                    },
                    body: JSON.stringify({ password: randomUser.password })
                });
                expect((result.payload as any).response).toBe(200);
                expect((result.payload as any).data).toEqual(fakeBody);
            });
        });

        describe('Get Settings', () => {
            it('should return user settings successfully', async () => {
                const randomUser = generateUser();
                store.dispatch(saveUser(randomUser));
                const fakeSettings = generateSettings();
                const mockFetch = getSuccceedFetchMocker(200, fakeSettings);
                const result = await store.dispatch(getSettings());
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/settings", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${randomUser.loginToken}`
                    }
                });
                expect((result.payload as any).response).toBe(200);
                expect((result.payload as any).data).toEqual(fakeSettings);
            });
        });

        describe('Change Settings', () => {
            it('should successfully change settings', async () => {
                const randomUser = generateUser();
                store.dispatch(saveUser(randomUser));
                const newSettings = generateSettings();
                const mockFetch = getSuccceedFetchMocker(200, { message: "Settings updated successfully" });
                const result = await store.dispatch(changeSettings(newSettings[0]));
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith(`https://localhost:3000/user/settings/${newSettings[0].id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${randomUser.loginToken}`
                    },
                    body: JSON.stringify(newSettings[0])
                });
                expect((result.payload as any).response).toBe(200);
                expect((result.payload as any).data).toEqual({ message: "Settings updated successfully" });
            });
        });

        describe('Get Stats', () => {
            it('should return user stats successfully', async () => {
                const randomUser = generateUser();
                store.dispatch(saveUser(randomUser));
                const fakeData = { test: "test1" };
                const mockFetch = getSuccceedFetchMocker(200, fakeData);
                const result = await store.dispatch(getStats());
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/stats", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${randomUser.loginToken}`
                    }
                });
                expect((result.payload as any).response).toBe(200);
                expect((result.payload as any).data).toEqual(fakeData);
            });
        });

        describe('Get Collection', () => {
            it('should return user collection successfully', async () => {
                const randomUser = generateUser();
                store.dispatch(saveUser(randomUser));
                const fakeData = { test: "test1" };
                const mockFetch = getSuccceedFetchMocker(200, fakeData);
                const result = await store.dispatch(getCollection());
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/collection", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${randomUser.loginToken}`
                    }
                });
                expect((result.payload as any).response).toBe(200);
                expect((result.payload as any).data).toEqual(fakeData);
            });
        });

        describe('Change Profile Pictures', () => {
            it('should successfully change profile pictures', async () => {
                const randomUser = generateUser();
                store.dispatch(saveUser(randomUser));
                const mockFetch = getSuccceedFetchMocker(200, { message: "Settings updated successfully" });
                const result = await store.dispatch(changeProfilePics({profilePicture: 1, profileBorder:2}));
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith(`https://localhost:3000/user/profile`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${randomUser.loginToken}`
                    },
                    body: JSON.stringify({
                        profilePicture: 1,
                        profileBorder: 2
                    })
                });
                expect((result.payload as any).response).toBe(200);
                expect((result.payload as any).data).toEqual({ message: "Settings updated successfully" });
            });
        });

        describe('Get Gamemodes', () => {
            it('should return gamemodes successfully', async () => {
                const randomUser = generateUser();
                store.dispatch(saveUser(randomUser));
                const fakeData = { test: "test1" };
                const mockFetch = getSuccceedFetchMocker(200, fakeData);
                const result = await store.dispatch(getGamemodes("singleplayer"));
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/game/singleplayer", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${randomUser.loginToken}`
                    }
                });
                expect((result.payload as any).response).toBe(200);
                expect((result.payload as any).data).toEqual(fakeData);
            });
        });
    });
})