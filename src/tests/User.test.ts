import { vi } from "vitest";
import user from "../classes/User";
import { Settings } from "../interfaces/Settings";
import { faker } from "@faker-js/faker";


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
        stayLogin: faker.datatype.boolean(),
        profilePicture: generateImage(),
        profileBorder: generateImage()
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

describe('User class', () => {
    it('should update user data correctly', () => {
        const randomUser = generateUser()
        user.saveUser(randomUser.username, randomUser.loginToken, randomUser.stayLogin, randomUser.profilePicture, randomUser.profileBorder)
        expect(user.Username).toBe(randomUser.username);
        expect(user.LoginToken).toBe(randomUser.loginToken);
        expect(user.StayLogin).toBe(randomUser.stayLogin);
        expect(user.ProfilePicture).toEqual(randomUser.profilePicture);
        expect(user.ProfileBorder).toEqual(randomUser.profileBorder);
    });

    it('should update user settings correctly', () => {
        const randomUser = generateUser()
        user.saveUser(randomUser.username, randomUser.loginToken, randomUser.stayLogin, randomUser.profilePicture, randomUser.profileBorder)
        const settings: Settings[] = generateSettings()
        user.saveSettings(settings)
        expect(user.Settings).toEqual(settings);
    });

    it('should store user data in sessionStorage', () => {
        const setItemMock = getStorageMocker("sessionStorage")
        const randomUser = generateUser()
        user.saveUser(randomUser.username, randomUser.loginToken, false, randomUser.profilePicture, randomUser.profileBorder)
        expect(setItemMock).toHaveBeenCalledWith('username', randomUser.username);
        expect(setItemMock).toHaveBeenCalledWith('loginToken', randomUser.loginToken);
        expect(setItemMock).toHaveBeenCalledWith('stayLogin', false);
        expect(setItemMock).toHaveBeenCalledWith('profilePicture', JSON.stringify(randomUser.profilePicture));
        expect(setItemMock).toHaveBeenCalledWith('profileBorder', JSON.stringify(randomUser.profileBorder));
    })

    it('should store user data in localStorage', () => {
        const setItemMock = getStorageMocker("localStorage")
        const randomUser = generateUser()
        user.saveUser(randomUser.username, randomUser.loginToken, true, randomUser.profilePicture, randomUser.profileBorder)
        expect(setItemMock).toHaveBeenCalledWith('username', randomUser.username);
        expect(setItemMock).toHaveBeenCalledWith('loginToken', randomUser.loginToken);
        expect(setItemMock).toHaveBeenCalledWith('stayLogin', true);
        expect(setItemMock).toHaveBeenCalledWith('profilePicture', JSON.stringify(randomUser.profilePicture));
        expect(setItemMock).toHaveBeenCalledWith('profileBorder', JSON.stringify(randomUser.profileBorder));
    })

    it('should store user settings in sessionStorage', () => {
        const setItemMock = getStorageMocker("sessionStorage")
        const randomUser = generateUser()
        user.saveUser(randomUser.username, randomUser.loginToken, false, randomUser.profilePicture, randomUser.profileBorder)
        const settings: Settings[] = generateSettings()
        user.saveSettings(settings)
        expect(setItemMock).toHaveBeenCalledWith('settings', JSON.stringify(settings));
    })

    it('should store user settings in localStorage', () => {
        const setItemMock = getStorageMocker("localStorage")
        const randomUser = generateUser()
        user.saveUser(randomUser.username, randomUser.loginToken, true, randomUser.profilePicture, randomUser.profileBorder)
        const settings: Settings[] = generateSettings()
        user.saveSettings(settings)
        expect(setItemMock).toHaveBeenCalledWith('settings', JSON.stringify(settings));
    })

    it('should clear user data', () => {
        getStorageMocker("localStorage")
        const randomUser = generateUser()
        user.saveUser(randomUser.username, randomUser.loginToken, true, randomUser.profilePicture, randomUser.profileBorder)
        const settings: Settings[] = generateSettings()
        user.saveSettings(settings)
        user.clear()
        expect(user.Username).toBe(null);
        expect(user.LoginToken).toBe(null);
        expect(user.StayLogin).toBe(false);
        expect(user.ProfilePicture).toEqual(null);
        expect(user.ProfileBorder).toEqual(null);
        expect(user.Settings).toEqual(null);
    })

    it('should load user data from localStorage', () => {
        getStorageMocker("localStorage")
        const randomUser = generateUser()
        user.saveUser(randomUser.username, randomUser.loginToken, true, randomUser.profilePicture, randomUser.profileBorder)
        const settings: Settings[] = generateSettings()
        user.saveSettings(settings)
        user.loadUser();
        user.saveSettings(settings)
        expect(user.Username).toBe(randomUser.username);
        expect(user.LoginToken).toBe(randomUser.loginToken);
        expect(user.StayLogin).toBe(true);
        expect(user.ProfilePicture).toEqual(randomUser.profilePicture);
        expect(user.ProfileBorder).toEqual(randomUser.profileBorder);
        expect(user.Settings).toEqual(settings);
    });
});