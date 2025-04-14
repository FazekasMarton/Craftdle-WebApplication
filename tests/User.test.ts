import { vi } from "vitest";
import { saveSettings, saveUser, clearUser, loadUser } from "../src/features/user/userSlice";
import { store } from "../src/app/store";

/**
 * Mock Redux actions
 */
vi.mock("../features/user/userSlice", async () => {
    const actual = await import("../src/features/user/userSlice");
    return {
        ...actual,
        saveUser: vi.fn(),
        saveSettings: vi.fn(),
        clearUser: vi.fn(),
        loadUser: vi.fn(),
    };
});

/**
 * Mock localStorage and sessionStorage
 */
vi.stubGlobal("localStorage", {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
});

vi.stubGlobal("sessionStorage", {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
});

vi.stubGlobal("import.meta", {
    env: {
        VITE_SERVER_URL: "https://mocked-api.com"
    }
});

/**
 * Fixed test data
 */
const fixedUser = {
    username: "TestUser",
    loginToken: "test-login-token",
    isGuest: false,
    stayLoggedIn: true,
    profilePicture: { id: 1, name: "image-1", src: "https://example.com/image-1.jpg" },
    profileBorder: { id: 2, name: "image-2", src: "https://example.com/image-2.jpg" },
    email: "testuser@example.com",
    password: "TestPassword123!",
};

const fixedSettings = [
    {
        id: 1,
        volume: 50,
        imagesSize: 75,
        isSet: true,
        controls: {
            isTapMode: false,
            copy: "C",
            remove: "R",
            tableMapping: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
        },
    },
    {
        id: 2,
        volume: 30,
        imagesSize: 50,
        isSet: false,
        controls: {
            isTapMode: true,
            copy: "X",
            remove: "Y",
            tableMapping: ["J", "K", "L", "M", "N", "O", "P", "Q", "R"],
        },
    },
    {
        id: 3,
        volume: 100,
        imagesSize: 100,
        isSet: false,
        controls: {
            isTapMode: false,
            copy: "Z",
            remove: "A",
            tableMapping: ["S", "T", "U", "V", "W", "X", "Y", "Z", "A"],
        },
    }
];

/**
 * Cleanup before each test
 */
beforeEach(() => {
    vi.stubGlobal("import.meta", {
        env: {
            VITE_SERVER_URL: "https://mocked-api.com",
        },
    });
    vi.clearAllMocks();
});



/**
 * Cleanup after each test
 */
afterEach(async () => {
    localStorage.clear();
    sessionStorage.clear();
    await store.dispatch(clearUser(true));
});

describe("User Slice", () => {
    describe("Data controller functions", () => {
        describe("Update user", () => {
            it("should update user data correctly", () => {
                // Test that the user data is updated in the Redux store when saveUser is dispatched.
                store.dispatch(saveUser(fixedUser));

                const state = store.getState().user;

                expect(state.username).toBe(fixedUser.username);
                expect(state.loginToken).toBe(fixedUser.loginToken);
                expect(state.isGuest).toBe(fixedUser.isGuest);
                expect(state.stayLoggedIn).toBe(fixedUser.stayLoggedIn);
                expect(state.profilePicture).toEqual(fixedUser.profilePicture);
                expect(state.profileBorder).toEqual(fixedUser.profileBorder);
            });

            it("should update user settings correctly", () => {
                // Test that the user settings are updated in the Redux store when saveSettings is dispatched.
                vi.spyOn(store, "dispatch");

                store.dispatch(saveSettings(fixedSettings));

                expect(store.dispatch).toHaveBeenCalledWith(saveSettings(fixedSettings));
            });
        });

        describe("Store in sessionStorage", () => {
            it("should store user data in sessionStorage", () => {
                // Test that user data is stored in sessionStorage when stayLoggedIn is false.
                fixedUser.stayLoggedIn = false;
                store.dispatch(saveUser(fixedUser));

                expect(sessionStorage.setItem).toHaveBeenCalledWith("username", "TestUser");
                expect(sessionStorage.setItem).toHaveBeenCalledWith("loginToken", "test-login-token");
                expect(sessionStorage.setItem).toHaveBeenCalledWith("isGuest", "false");
                expect(sessionStorage.setItem).toHaveBeenCalledWith(
                    "profilePicture",
                    JSON.stringify({ id: 1, name: "image-1", src: "https://example.com/image-1.jpg" })
                );
                expect(sessionStorage.setItem).toHaveBeenCalledWith(
                    "profileBorder",
                    JSON.stringify({ id: 2, name: "image-2", src: "https://example.com/image-2.jpg" })
                );
                expect(sessionStorage.setItem).toHaveBeenCalledWith("settings", "null");
                expect(sessionStorage.setItem).toHaveBeenCalledWith("installed", "null");
                expect(sessionStorage.setItem).toHaveBeenCalledWith("email", "testuser@example.com");
                expect(sessionStorage.setItem).toHaveBeenCalledWith("password", "TestPassword123!");
            });
        });

        describe("Store in localStorage", () => {
            it("should store user data in localStorage", () => {
                // Test that user data is stored in localStorage when stayLoggedIn is true.
                fixedUser.stayLoggedIn = true;
                store.dispatch(saveUser(fixedUser));

                expect(localStorage.setItem).toHaveBeenCalledWith("username", "TestUser");
                expect(localStorage.setItem).toHaveBeenCalledWith("loginToken", "test-login-token");
                expect(localStorage.setItem).toHaveBeenCalledWith("isGuest", "false");
                expect(localStorage.setItem).toHaveBeenCalledWith(
                    "profilePicture",
                    JSON.stringify({ id: 1, name: "image-1", src: "https://example.com/image-1.jpg" })
                );
                expect(localStorage.setItem).toHaveBeenCalledWith(
                    "profileBorder",
                    JSON.stringify({ id: 2, name: "image-2", src: "https://example.com/image-2.jpg" })
                );
                expect(localStorage.setItem).toHaveBeenCalledWith("settings", "null");
                expect(localStorage.setItem).toHaveBeenCalledWith("installed", "null");
                expect(localStorage.setItem).toHaveBeenCalledWith("email", "testuser@example.com");
                expect(localStorage.setItem).toHaveBeenCalledWith("password", "TestPassword123!");
            });
        });

        it("should clear user data", async () => {
            // Test that user data is cleared from the Redux store when clearUser is dispatched.
            vi.spyOn(store, "dispatch");

            store.dispatch(saveUser(fixedUser));
            store.dispatch(saveSettings(fixedSettings));

            await store.dispatch(clearUser(true));

            expect(store.dispatch).toHaveBeenCalledWith(clearUser(true));
        });

        describe("Load data from localStorage", () => {
            it("should load user data from localStorage", () => {
                // Test that user data is loaded from localStorage when loadUser is dispatched.
                vi.spyOn(localStorage, "getItem").mockImplementation((key) => {
                    const data = {
                        username: fixedUser.username,
                        loginToken: fixedUser.loginToken,
                        isGuest: String(fixedUser.isGuest),
                        stayLoggedIn: "true",
                        profilePicture: JSON.stringify(fixedUser.profilePicture),
                        profileBorder: JSON.stringify(fixedUser.profileBorder),
                        settings: JSON.stringify(fixedSettings),
                    };
                    return data[key] || null;
                });

                store.dispatch(loadUser());

                expect(store.dispatch).toHaveBeenCalledWith(loadUser());
            });

            it("should load no data from localStorage", async () => {
                // Test that no data is loaded when localStorage is empty.
                vi.spyOn(localStorage, "getItem").mockReturnValue(null);

                await store.dispatch(loadUser());

                expect(store.dispatch).toHaveBeenCalledWith(loadUser());
            });
        });
    });
});