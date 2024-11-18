import { vi } from "vitest";
import user from "../classes/User";
import { Settings } from "../interfaces/Settings";
import { faker } from "@faker-js/faker";
import { error } from "../classes/Error";

function getStorageMocker(storageType: "localStorage" | "sessionStorage") {
    const storage: Record<string, string> = {};
    const getItemMock = vi.fn((key: string) => storage[key] || null);
    const setItemMock = vi.fn((key: string, value: string) => {
        storage[key] = value;
    });
    Object.defineProperty(window, storageType, {
        value: {
            getItem: getItemMock,
            setItem: setItemMock
        }
    });
    return setItemMock
}

function generateUser() {
    return {
        username: faker.person.fullName(),
        loginToken: faker.string.uuid(),
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

describe('User class', () => {
    describe('Data controller functions', () => {
        describe('Update user', () => {
            it('should update user data correctly', () => {
                user.clear();
                const randomUser = generateUser()
                user.saveUser(randomUser.username, randomUser.loginToken, randomUser.stayLoggedIn, randomUser.profilePicture, randomUser.profileBorder)
                expect(user.Username).toBe(randomUser.username);
                expect(user.LoginToken).toBe(randomUser.loginToken);
                expect(user.StayLoggedIn).toBe(randomUser.stayLoggedIn);
                expect(user.ProfilePicture).toEqual(randomUser.profilePicture);
                expect(user.ProfileBorder).toEqual(randomUser.profileBorder);
            });

            it('should update user settings correctly', () => {
                user.clear();
                const randomUser = generateUser()
                user.saveUser(randomUser.username, randomUser.loginToken, randomUser.stayLoggedIn, randomUser.profilePicture, randomUser.profileBorder)
                const settings: Settings[] = generateSettings()
                user.saveSettings(settings)
                expect(user.Settings).toEqual(settings);
            });
        })

        describe('Store in sessionStorage', () => {
            it('should store user data in sessionStorage', () => {
                const setItemMock = getStorageMocker("sessionStorage")
                user.clear();
                const randomUser = generateUser()
                user.saveUser(randomUser.username, randomUser.loginToken, false, randomUser.profilePicture, randomUser.profileBorder)
                expect(setItemMock).toHaveBeenCalledWith('username', randomUser.username);
                expect(setItemMock).toHaveBeenCalledWith('loginToken', randomUser.loginToken);
                expect(setItemMock).toHaveBeenCalledWith('stayLoggedIn', false);
                expect(setItemMock).toHaveBeenCalledWith('profilePicture', JSON.stringify(randomUser.profilePicture));
                expect(setItemMock).toHaveBeenCalledWith('profileBorder', JSON.stringify(randomUser.profileBorder));
            })

            it('should store user settings in sessionStorage', () => {
                const setItemMock = getStorageMocker("sessionStorage")
                user.clear();
                const randomUser = generateUser()
                user.saveUser(randomUser.username, randomUser.loginToken, false, randomUser.profilePicture, randomUser.profileBorder)
                const settings: Settings[] = generateSettings()
                user.saveSettings(settings)
                expect(setItemMock).toHaveBeenCalledWith('settings', JSON.stringify(settings));
            })
        })

        describe('Store in localStorage', () => {
            it('should store user data in localStorage', () => {
                const setItemMock = getStorageMocker("localStorage")
                user.clear();
                const randomUser = generateUser()
                user.saveUser(randomUser.username, randomUser.loginToken, true, randomUser.profilePicture, randomUser.profileBorder)
                expect(setItemMock).toHaveBeenCalledWith('username', randomUser.username);
                expect(setItemMock).toHaveBeenCalledWith('loginToken', randomUser.loginToken);
                expect(setItemMock).toHaveBeenCalledWith('stayLoggedIn', true);
                expect(setItemMock).toHaveBeenCalledWith('profilePicture', JSON.stringify(randomUser.profilePicture));
                expect(setItemMock).toHaveBeenCalledWith('profileBorder', JSON.stringify(randomUser.profileBorder));
            })

            it('should store user settings in localStorage', () => {
                const setItemMock = getStorageMocker("localStorage")
                user.clear();
                const randomUser = generateUser()
                user.saveUser(randomUser.username, randomUser.loginToken, true, randomUser.profilePicture, randomUser.profileBorder)
                const settings: Settings[] = generateSettings()
                user.saveSettings(settings)
                expect(setItemMock).toHaveBeenCalledWith('settings', JSON.stringify(settings));
            })
        })

        it('should clear user data', () => {
            getStorageMocker("localStorage")
            user.clear();
            const randomUser = generateUser()
            user.saveUser(randomUser.username, randomUser.loginToken, true, randomUser.profilePicture, randomUser.profileBorder)
            const settings: Settings[] = generateSettings()
            user.saveSettings(settings)
            user.clear()
            expect(user.Username).toBe(null);
            expect(user.LoginToken).toBe(null);
            expect(user.StayLoggedIn).toBe(false);
            expect(user.ProfilePicture).toEqual(null);
            expect(user.ProfileBorder).toEqual(null);
            expect(user.Settings).toEqual(null);
        })

        describe('Load data from localStorage', () => {
            it('should load user data from localStorage', () => {
                getStorageMocker("localStorage")
                user.clear();
                const randomUser = generateUser()
                user.saveUser(randomUser.username, randomUser.loginToken, true, randomUser.profilePicture, randomUser.profileBorder)
                const settings: Settings[] = generateSettings()
                user.saveSettings(settings)
                user.clear()
                user.loadUser();
                expect(user.Username).toBe(randomUser.username);
                expect(user.LoginToken).toBe(randomUser.loginToken);
                expect(user.StayLoggedIn).toBe(true);
                expect(user.ProfilePicture).toEqual(randomUser.profilePicture);
                expect(user.ProfileBorder).toEqual(randomUser.profileBorder);
                expect(user.Settings).toEqual(settings);
            });

            it('should load no data from localStorage', () => {
                getStorageMocker("localStorage")
                user.clear();
                user.loadUser();
                expect(user.Username).toBe(null);
                expect(user.LoginToken).toBe(null);
                expect(user.StayLoggedIn).toBe(false);
                expect(user.ProfilePicture).toEqual(null);
                expect(user.ProfileBorder).toEqual(null);
                expect(user.Settings).toEqual(null);
            })
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
                const result = await user.register(randomUser.username, randomUser.email, randomUser.password, randomUser.stayLoggedIn);
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.loginToken}`
                    },
                    body: JSON.stringify({
                        username: randomUser.username,
                        email: randomUser.email,
                        password: randomUser.password,
                        stayLoggedIn: randomUser.stayLoggedIn
                    })
                });
                expect(result?.response.status).toBe(200);
                expect(result?.data).toEqual(fakeBody);
            });

            it('should handle failed register due to server error', async () => {
                const randomUser = generateUser();
                const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Server Error"));
                global.fetch = mockFetch;
                const errorMock = vi.spyOn(error, "setError");
                await user.register(randomUser.username, randomUser.email, randomUser.password, randomUser.stayLoggedIn);
                expect(mockFetch).toHaveBeenCalledTimes(1);
                errorMock.mockRestore();
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
                const result = await user.guestLogin();
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/login");
                expect(result?.response.status).toBe(200);
                expect(result?.data).toEqual(fakeBody);
            });

            it('should handle failed guest login due to server error', async () => {
                const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Server Error"));
                global.fetch = mockFetch;
                const errorMock = vi.spyOn(error, "setError");
                await user.guestLogin();
                expect(mockFetch).toHaveBeenCalledTimes(1);
                errorMock.mockRestore();
            });
        });

        describe('Token Login', () => {
            it('should return data and response for a successful token login', async () => {
                const fakeBody = {
                    loginToken: faker.string.uuid(),
                    username: "tokenUser",
                    profilePicture: generateImage(),
                    profileBorder: generateImage(),
                };
                const mockFetch = getSuccceedFetchMocker(200, fakeBody);
                const result = await user.tokenLogin();
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.LoginToken}`
                    },
                });
                expect(result?.response.status).toBe(200);
                expect(result?.data).toEqual(fakeBody);
            });

            it('should handle failed token login due to server error', async () => {
                const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Server Error"));
                global.fetch = mockFetch;
                const errorMock = vi.spyOn(error, "setError");
                await user.tokenLogin();
                expect(mockFetch).toHaveBeenCalledTimes(1);
                errorMock.mockRestore();
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
                const result = await user.login(randomUser.username, randomUser.password, randomUser.stayLoggedIn);
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
                expect(result?.response.status).toBe(200);
                expect(result?.data).toEqual(fakeBody);
            });

            it('should handle failed login due to server error', async () => {
                const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Server Error"));
                global.fetch = mockFetch;
                const errorMock = vi.spyOn(error, "setError");
                await user.login("invalidUser", "wrongPassword", false);
                expect(mockFetch).toHaveBeenCalledTimes(1);
                errorMock.mockRestore();
            });
        });

        describe('Logout', () => {
            it('should successfully logout the user', async () => {
                const mockFetch = getSuccceedFetchMocker(200, { message: "Logout successful" });
                const randomUser = generateUser();
                const auth = btoa(`${randomUser.username}:${randomUser.loginToken}`)
                user.saveUser(randomUser.username, randomUser.loginToken, randomUser.stayLoggedIn, randomUser.profilePicture, randomUser.profileBorder)
                const result = await user.logout();
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/login", {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${auth}`
                    }
                });
                expect(result?.response.status).toBe(200);
                expect(result?.data).toEqual({ message: "Logout successful" });
            });

            it('should handle failed logout due to server error', async () => {
                const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Server Error"));
                global.fetch = mockFetch;
                const errorMock = vi.spyOn(error, "setError");
                await user.logout();
                expect(mockFetch).toHaveBeenCalledTimes(1);
                errorMock.mockRestore();
            });
        });

        describe('Forgot Password', () => {
            it('should return success message for a successful password reset request', async () => {
                const randomUser = generateUser();
                const fakeBody = { item: generateImage() };
                const mockFetch = getSuccceedFetchMocker(200, fakeBody);
                const result = await user.forgotPassword(randomUser.email);
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/password", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: randomUser.email })
                });
                expect(result?.response.status).toBe(200);
                expect(result?.data).toEqual(fakeBody);
            });

            it('should handle failed forgot password due to server error', async () => {
                const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Server Error"));
                global.fetch = mockFetch;
                const errorMock = vi.spyOn(error, "setError");
                await user.forgotPassword("invalidemail@gmail.com");
                expect(mockFetch).toHaveBeenCalledTimes(1);
                errorMock.mockRestore();
            });
        });

        describe('Change Password', () => {
            it('should return success message for a successful password change', async () => {
                const randomUser = generateUser();
                const fakeBody = { message: "Password updated successfully" };
                const mockFetch = getSuccceedFetchMocker(200, fakeBody);
                const result = await user.changePassword(randomUser.password);
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/password", {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ password: randomUser.password })
                });
                expect(result?.response.status).toBe(200);
                expect(result?.data).toEqual(fakeBody);
            });

            it('should handle failed password change due to server error', async () => {
                const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Server Error"));
                global.fetch = mockFetch;
                const errorMock = vi.spyOn(error, "setError");
                await user.changePassword("wrongPassword");
                expect(mockFetch).toHaveBeenCalledTimes(1);
                errorMock.mockRestore();
            });
        });

        describe('Get Settings', () => {
            it('should return user settings successfully', async () => {
                const randomUser = generateUser();
                user.saveUser(randomUser.username, randomUser.loginToken, randomUser.stayLoggedIn, randomUser.profilePicture, randomUser.profileBorder)
                const fakeSettings = generateSettings();
                const mockFetch = getSuccceedFetchMocker(200, fakeSettings);
                const result = await user.getSettings();
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/settings", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${randomUser.loginToken}`
                    }
                });
                expect(result?.response.status).toBe(200);
                expect(result?.data).toEqual(fakeSettings);
            });

            it('should handle failed settings retrieval due to server error', async () => {
                const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Server Error"));
                global.fetch = mockFetch;
                const errorMock = vi.spyOn(error, "setError");
                await user.getSettings();
                expect(mockFetch).toHaveBeenCalledTimes(1);
                errorMock.mockRestore();
            });
        });

        describe('Change Settings', () => {
            it('should successfully change settings', async () => {
                const newSettings = generateSettings();
                const mockFetch = getSuccceedFetchMocker(200, { message: "Settings updated successfully" });
                const result = await user.changeSettings(newSettings[0]);
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith(`https://localhost:3000/user/settings/${newSettings[0].id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.loginToken}`
                    },
                    body: JSON.stringify(newSettings[0])
                });
                expect(result?.response.status).toBe(200);
                expect(result?.data).toEqual({ message: "Settings updated successfully" });
            });

            it('should handle failed settings update due to server error', async () => {
                const newSettings = generateSettings();
                const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Server Error"));
                global.fetch = mockFetch;
                const errorMock = vi.spyOn(error, "setError");
                await user.changeSettings(newSettings[0]);
                expect(mockFetch).toHaveBeenCalledTimes(1);
                errorMock.mockRestore();
            });
        });

        describe('Get Stats', () => {
            it('should return user stats successfully', async () => {
                const randomUser = generateUser();
                user.saveUser(randomUser.username, randomUser.loginToken, randomUser.stayLoggedIn, randomUser.profilePicture, randomUser.profileBorder)
                const fakeData = { test: "test1" };
                const mockFetch = getSuccceedFetchMocker(200, fakeData);
                const result = await user.getStats();
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/stats", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${randomUser.loginToken}`
                    }
                });
                expect(result?.response.status).toBe(200);
                expect(result?.data).toEqual(fakeData);
            });

            it('should handle failed stats retrieval due to server error', async () => {
                const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Server Error"));
                global.fetch = mockFetch;
                const errorMock = vi.spyOn(error, "setError");
                await user.getStats();
                expect(mockFetch).toHaveBeenCalledTimes(1);
                errorMock.mockRestore();
            });
        });

        describe('Get Collection', () => {
            it('should return user collection successfully', async () => {
                const randomUser = generateUser();
                user.saveUser(randomUser.username, randomUser.loginToken, randomUser.stayLoggedIn, randomUser.profilePicture, randomUser.profileBorder)
                const fakeData = { test: "test1" };
                const mockFetch = getSuccceedFetchMocker(200, fakeData);
                const result = await user.getCollection();
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/user/collection", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${randomUser.loginToken}`
                    }
                });
                expect(result?.response.status).toBe(200);
                expect(result?.data).toEqual(fakeData);
            });

            it('should handle failed collection retrieval due to server error', async () => {
                const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Server Error"));
                global.fetch = mockFetch;
                const errorMock = vi.spyOn(error, "setError");
                await user.getCollection();
                expect(mockFetch).toHaveBeenCalledTimes(1);
                errorMock.mockRestore();
            });
        });

        describe('Change Profile Pictures', () => {
            it('should successfully change profile pictures', async () => {
                const mockFetch = getSuccceedFetchMocker(200, { message: "Settings updated successfully" });
                const result = await user.changeProfilePics(1, 2);
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith(`https://localhost:3000/user/profile`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.loginToken}`
                    },
                    body: JSON.stringify({
                        profilePicture: 1,
                        profileBorder: 2
                    })
                });
                expect(result?.response.status).toBe(200);
                expect(result?.data).toEqual({ message: "Settings updated successfully" });
            });

            it('should handle failed profile pictures update due to server error', async () => {
                const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Server Error"));
                global.fetch = mockFetch;
                const errorMock = vi.spyOn(error, "setError");
                await user.changeProfilePics(1, 3);
                expect(mockFetch).toHaveBeenCalledTimes(1);
                errorMock.mockRestore();
            });
        });

        describe('Get Gamemodes', () => {
            it('should return gamemodes successfully', async () => {
                const randomUser = generateUser();
                user.saveUser(randomUser.username, randomUser.loginToken, randomUser.stayLoggedIn, randomUser.profilePicture, randomUser.profileBorder)
                const fakeData = { test: "test1" };
                const mockFetch = getSuccceedFetchMocker(200, fakeData);
                const result = await user.getGamemodes("singleplayer");
                expect(mockFetch).toHaveBeenCalledTimes(1);
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/game/singleplayer", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${randomUser.loginToken}`
                    }
                });
                expect(result?.response.status).toBe(200);
                expect(result?.data).toEqual(fakeData);
            });

            it('should handle failed gamemodes retrieval due to server error', async () => {
                const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Server Error"));
                global.fetch = mockFetch;
                const errorMock = vi.spyOn(error, "setError");
                await user.getGamemodes("singleplayer");
                expect(mockFetch).toHaveBeenCalledTimes(1);
                errorMock.mockRestore();
            });
        });
    });
})