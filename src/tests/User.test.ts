import { vi } from "vitest";
import user from "../classes/User";
import { Settings } from "../interfaces/Settings";
import { faker } from "@faker-js/faker";
import { error } from "../classes/Error";

function getStorageMocker(storageType: "localStorage" | "sessionStorage"){
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

function getSuccceedFetchMocker(status: number, body: object){
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
                const randomUser = generateUser()
                const fakeBody = {
                    loginToken: randomUser.loginToken,
                    username: randomUser.username,
                    profilePicture: randomUser.profilePicture,
                    profileBorder: randomUser.profileBorder,
                    stayLoggedIn: randomUser.stayLoggedIn
                }
                const mockFetch = getSuccceedFetchMocker(201, fakeBody)
                const result = await user.register(randomUser.username, randomUser.email, randomUser.password, randomUser.stayLoggedIn);
                expect(mockFetch).toHaveBeenCalledTimes(1)
                expect(mockFetch).toHaveBeenCalledWith("https://localhost:3000/register", {
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
                expect(result?.response.status).toBe(201);
                expect(result?.data).toEqual(fakeBody);
            });
        
            it('should get Service Unavailable error', async () => {
                const randomUser = generateUser()
                const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Network Error"));
                global.fetch = mockFetch;
                const errorMock = vi.spyOn(error, "setError");
                await user.register(randomUser.username, randomUser.email, randomUser.password, randomUser.stayLoggedIn);
                expect(mockFetch).toHaveBeenCalledTimes(1)
                expect(errorMock).toHaveBeenCalledWith(
                    503,
                    "Service Unavailable",
                    "Failed to connect to the server. Please try again later."
                );
                errorMock.mockRestore();
            })
        })
    });
})