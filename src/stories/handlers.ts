import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';
import tutorial from "./assets/imgs/gamemodes/Tutorial.png";
import classic from "./assets/imgs/gamemodes/Classic.png";
import daily from "./assets/imgs/gamemodes/Daily.png";
import allinone from "./assets/imgs/gamemodes/All_in_One.png";
import pocket from "./assets/imgs/gamemodes/Pocket.png";
import resource from "./assets/imgs/gamemodes/Resource.png";
import hardcore from "./assets/imgs/gamemodes/Hardcore.png";
import { ISettings } from '../interfaces/ISettings';
import { IGamemode } from '../interfaces/IGamemode';
import gold from "./assets/imgs/profileBorders/Gold.png";
import amethyst from "./assets/imgs/profileBorders/Amethyst.png";
import iron from "./assets/imgs/profileBorders/Iron.png";
import fox from "./assets/imgs/profilepictures/Fox.png";
import enderman from "./assets/imgs/profilepictures/Enderman.png";
import chicken from "./assets/imgs/profilepictures/Chicken.png";
import op from "./assets/imgs/items/Oak_Planks.png";
import stick from "./assets/imgs/items/Stick.png";
import ironIngot from './assets/imgs/items/Iron_Ingot.png';
import sprucePlanks from './assets/imgs/items/Spruce_Planks.png';
import birchPlanks from './assets/imgs/items/Birch_Planks.png';
import junglePlanks from './assets/imgs/items/Jungle_Planks.png';
import acaciaPlanks from './assets/imgs/items/Acacia_Planks.png';
import darkOakPlanks from './assets/imgs/items/Dark_Oak_Planks.png';
import mangrovePlanks from './assets/imgs/items/Mangrove_Planks.png';
import cherryPlanks from './assets/imgs/items/Cherry_Planks.png';
import paleOakPlanks from './assets/imgs/items/Pale_Oak_Planks.png';
import bambooPlanks from './assets/imgs/items/Bamboo_Planks.png';
import crimsonPlanks from './assets/imgs/items/Crimson_Planks.png';
import warpedPlanks from './assets/imgs/items/Warped_Planks.png';
import gunpowder from './assets/imgs/items/Gunpowder.png';
import paper from './assets/imgs/items/Paper.png';
import fireworkStar from './assets/imgs/items/Firework_Star.png';
import fireworkRocket from './assets/imgs/items/Firework_Rocket.png';
import tripwireHook from './assets/imgs/items/Tripwire_Hook.png';

/**
 * Handlers for mocking API requests.
 */
export const handlers = [
    // Handler for user login
    http.get('http://localhost:3000/users/login', () => {
        return HttpResponse.json({
            data: {
                loginToken: "1234-5678-9000-AAAA-BBBB",
                username: "Guest1234",
                stayLoggedIn: false,
                isGuest: true,
                profilePicture: {
                    id: "picture",
                    name: "test_picture",
                    src: "Desert_Fletcher.png"
                },
                profileBorder: {
                    id: "border",
                    name: "test_border",
                    src: "Amethyst.png"
                }
            }
        });
    }),

    // Handler for user login with POST request
    http.post('http://localhost:3000/users/login', async ({ request }) => {
        let data: any;

        try {
            data = await request.json();
        } catch (error) {
            data = {};
        }

        if (data?.username == "Test") {
            return HttpResponse.json({
                message: {
                    error: {
                        username: ["Foglalt!"],
                        password: ["Túl hosszú!"]
                    }
                }
            }, { status: 400 });
        }

        return HttpResponse.json({
            data: {
                loginToken: "1234-5678-9012-3456-7890",
                username: data?.username || "Auto login",
                stayLoggedIn: data?.stayLoggedIn || false,
                isGuest: false,
                profilePicture: {
                    id: "picture",
                    name: "test_picture",
                    src: "Desert_Fletcher.png"
                },
                profileBorder: {
                    id: "border",
                    name: "test_border",
                    src: "Amethyst.png"
                }
            }
        });
    }),

    // Handler for user registration
    http.post('http://localhost:3000/users/register', async ({ request }) => {
        let data: any = await request.json();

        if (data.username == "Test123") {
            return HttpResponse.json({
                message: {
                    error: {
                        username: ["Foglalt!"],
                        email: ["Nem valid!"],
                        password: ["Túl hosszú!"]
                    }
                }
            }, { status: 400 });
        }

        return HttpResponse.json({
            data: {
                loginToken: "1234-5678-9012-3456-7890",
                username: data.username,
                stayLoggedIn: data.stayLoggedIn,
                isGuest: false,
                profilePicture: {
                    id: "picture",
                    name: "test_picture",
                    src: "Desert_Fletcher.png"
                },
                profileBorder: {
                    id: "border",
                    name: "test_border",
                    src: "Amethyst.png"
                }
            }
        });
    }),

    // Handler for user logout
    http.delete('http://localhost:3000/users/login', () => {
        return HttpResponse.json({
            message: "Siker!"
        });
    }),

    // Handler for getting user settings
    http.get('http://localhost:3000/users/settings', () => {
        const settings: ISettings[] = [
            {
                id: 45,
                volume: 0,
                imagesSize: 10,
                isSet: true,
                controls: {
                    copy: "LMB",
                    remove: "RMB",
                    isTapMode: false,
                    tableMapping: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                }
            },
            {
                id: 52,
                volume: 0,
                imagesSize: 10,
                isSet: false,
                controls: {
                    copy: "LMB",
                    remove: "RMB",
                    isTapMode: false,
                    tableMapping: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                }
            },
            {
                id: 56,
                volume: 0,
                imagesSize: 10,
                isSet: false,
                controls: {
                    copy: "LMB",
                    remove: "RMB",
                    isTapMode: false,
                    tableMapping: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                }
            }
        ];

        return HttpResponse.json({
            data: settings
        });
    }),

    // Handler for updating user settings
    http.put('http://localhost:3000/users/settings/:id', () => {
        return HttpResponse.json({
            message: "Siker!"
        });
    }),

    // Handler for getting singleplayer game modes
    http.get('http://localhost:3000/game/singleplayer', () => {
        const gamemodes: IGamemode[] = [
            {
                "id": 1,
                "icon": "Tutorial.png",
                "name": "Tutorial",
                "description": "In this mode, players can learn the game's mechanics and controls.",
                "difficulty": {
                    "name": "Beginner",
                    "color": "55FF55"
                },
                "continueGame": false,
                "playedBefore": false
            },
            {
                "id": 2,
                "icon": "Classic.png",
                "name": "Classic",
                "description": "In this mode, you receive recipes as riddles, but only those that are not made by one type of material. Four different hints are available to help you solve them.",
                "difficulty": {
                    "name": "Normal",
                    "color": "FFFF55"
                },
                "continueGame": true,
                "playedBefore": true
            },
            {
                "id": 3,
                "icon": "Daily.png",
                "name": "Daily",
                "description": "Similar to Classic, but can only be played once per day. Keep your streak going!",
                "difficulty": {
                    "name": "Normal",
                    "color": "FFFF55"
                },
                "continueGame": true,
                "playedBefore": false
            },
            {
                "id": 4,
                "icon": "AllInOne.png",
                "name": "All in One",
                "description": "In this mode, you can receive any recipe as a riddle. Four different hints are available to help you solve it.",
                "difficulty": {
                    "name": "Hard",
                    "color": "FFAA00"
                },
                "continueGame": false,
                "playedBefore": true
            },
            {
                "id": 5,
                "icon": "Pocket.png",
                "name": "Pocket",
                "description": "Similar to All in One, but you must work with a 2x2 crafting table to solve the riddles.",
                "difficulty": {
                    "name": "Normal",
                    "color": "FFFF55"
                },
                "continueGame": false,
                "playedBefore": false
            },
            {
                "id": 6,
                "icon": "Resource.png",
                "name": "Resource",
                "description": "Similar to Classic, but with a limited supply of materials.",
                "difficulty": {
                    "name": "Easy",
                    "color": "00AA00"
                },
                "continueGame": false,
                "playedBefore": true
            },
            {
                "id": 7,
                "icon": "Hardcore",
                "name": "Hardcore",
                "description": "Similar to Classic, but no hints are available, and the game is played with health points.",
                "difficulty": {
                    "name": "Insane",
                    "color": "AA0000"
                },
                "continueGame": true,
                "playedBefore": true
            }
        ];

        return HttpResponse.json({
            data: {
                gamemodes: gamemodes
            }
        });
    }),

    // Handler for getting profile borders
    http.get('http://localhost:3000/assets/profileBorders/:id', async ({ params }) => {
        let img = gold;
        switch (params.id) {
            case "Gold.png":
                img = gold;
                break;
            case "Amethyst.png":
                img = amethyst;
                break;
            case "Iron.png":
                img = iron;
                break;
        }
        const buffer = await fetch(img).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.arrayBuffer();
        });
        return HttpResponse.arrayBuffer(buffer, {
            headers: {
                'Content-Type': 'image/jpeg',
            },
        });
    }),

    // Handler for getting profile pictures
    http.get('http://localhost:3000/assets/profilepictures/:id', async ({ params }) => {
        let img = fox;
        switch (params.id) {
            case "Fox.png":
                img = fox;
                break;
            case "Enderman.png":
                img = enderman;
                break;
            case "Chicken.png":
                img = chicken;
                break;
        }
        const buffer = await fetch(img).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.arrayBuffer();
        });
        return HttpResponse.arrayBuffer(buffer, {
            headers: {
                'Content-Type': 'image/jpeg',
            },
        });
    }),

    // Handler for getting achievements
    http.get('http://localhost:3000/achievements/:id', async ({ params }) => {
        let img = tutorial;
        switch (params.id) {
            case "Classic.png":
                img = classic;
                break;
            case "AllInOne.png":
                img = allinone;
                break;
            case "Daily.png":
                img = daily;
                break;
            case "Hardcore.png":
                img = hardcore;
                break;
            case "Resource.png":
                img = resource;
                break;
            case "Pocket.png":
                img = pocket;
                break;
        }
        const buffer = await fetch(img).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.arrayBuffer();
        });
        return HttpResponse.arrayBuffer(buffer, {
            headers: {
                'Content-Type': 'image/jpeg',
            },
        });
    }),

    // Handler for getting items
    http.get('http://localhost:3000/assets/items/:id', async ({ params }) => {
        let img = op;
        switch (params.id) {
            case "Oak_Planks.png":
                img = op;
                break;
            case "Stick.png":
                img = stick;
                break;
            case "Iron_Ingot.png":
                img = ironIngot;
                break;
            case "Spruce_Planks.png":
                img = sprucePlanks;
                break;
            case "Birch_Planks.png":
                img = birchPlanks;
                break;
            case "Jungle_Planks.png":
                img = junglePlanks;
                break;
            case "Acacia_Planks.png":
                img = acaciaPlanks;
                break;
            case "Dark_Oak_Planks.png":
                img = darkOakPlanks;
                break;
            case "Mangrove_Planks.png":
                img = mangrovePlanks;
                break;
            case "Cherry_Planks.png":
                img = cherryPlanks;
                break;
            case "Pale_Oak_Planks.png":
                img = paleOakPlanks;
                break;
            case "Bamboo_Planks.png":
                img = bambooPlanks;
                break;
            case "Crimson_Planks.png":
                img = crimsonPlanks;
                break;
            case "Warped_Planks.png":
                img = warpedPlanks;
                break;
            case "Gunpowder.png":
                img = gunpowder;
                break;
            case "Paper.png":
                img = paper;
                break;
            case "Firework_Star.png":
                img = fireworkStar;
                break;
            case "Firework_Rocket.png":
                img = fireworkRocket;
                break;
            case "Tripwire_Hook.png":
                img = tripwireHook;
                break;
            default:
                img = op;
        }
        const buffer = await fetch(img).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.arrayBuffer();
        });
        return HttpResponse.arrayBuffer(buffer, {
            headers: {
                'Content-Type': 'image/png',
            },
        });
    }),

    // Handler for getting user stats
    http.get('http://localhost:3000/users/stats', () => {
        return HttpResponse.json({
            data: {
                username: "MartinPotter",
                profilePicture: {
                    id: "picture",
                    name: "test_picture",
                    src: "Desert_Nitwit.png"
                },
                profileBorder: {
                    id: "border",
                    name: "test_border",
                    src: "Spruce_Planks.png"
                },
                streak: 3,
                gamemodes: [
                    {
                        gamemodeName: "Classic",
                        played: 4,
                        solved: 3,
                        fastestSolve: 12,
                        color: "FFFF55"
                    },
                    {
                        gamemodeName: "All in One",
                        played: 0,
                        solved: 0,
                        fastestSolve: null,
                        color: "FFAA00"
                    },
                    {
                        gamemodeName: "Daily",
                        played: 1,
                        solved: 1,
                        fastestSolve: 18,
                        color: "FFFF55"
                    },
                    {
                        gamemodeName: "Hardcore",
                        played: 2,
                        solved: 0,
                        fastestSolve: null,
                        color: "AA0000"
                    }
                ],
                registrationDate: "2021-05-12",
                performedAchievements: {
                    collected: 2,
                    collectable: 5
                },
                collectedRecipes: {
                    collected: 5,
                    collectable: 10
                }
            }
        });
    }),

    // Handler for getting user collection
    http.get('http://localhost:3000/users/collection', () => {
        return HttpResponse.json({
            data: {
                inventory: [
                    {
                        id: 1,
                        name: "Oak Planks",
                        src: "Oak_Planks.png",
                        collected: false
                    },
                    {
                        id: 2,
                        name: "Stick",
                        src: "Stick.png",
                        collected: false
                    },
                    {
                        id: 3,
                        name: "Iron Ingot",
                        src: "Iron_Ingot.png",
                        collected: true
                    },
                    {
                        id: 4,
                        name: "Spruce Planks",
                        src: "Spruce_Planks.png",
                        collected: false
                    },
                    {
                        id: 5,
                        name: "Birch Planks",
                        src: "Birch_Planks.png",
                        collected: true
                    },
                    {
                        id: 6,
                        name: "Jungle Planks",
                        src: "Jungle_Planks.png",
                        collected: true
                    },
                    {
                        id: 7,
                        name: "Acacia Planks",
                        src: "Acacia_Planks.png",
                        collected: true
                    },
                    {
                        id: 8,
                        name: "Dark Oak Planks",
                        src: "Dark_Oak_Planks.png",
                        collected: false
                    },
                    {
                        id: 9,
                        name: "Mangrove Planks",
                        src: "Mangrove_Planks.png",
                        collected: true
                    },
                    {
                        id: 10,
                        name: "Cherry Planks",
                        src: "Cherry_Planks.png",
                        collected: false
                    },
                    {
                        id: 11,
                        name: "Pale Oak Planks",
                        src: "Pale_Oak_Planks.png",
                        collected: true
                    },
                    {
                        id: 12,
                        name: "Bamboo Planks",
                        src: "Bamboo_Planks.png",
                        collected: false
                    },
                    {
                        id: 13,
                        name: "Crimson Planks",
                        src: "Crimson_Planks.png",
                        collected: false
                    },
                    {
                        id: 14,
                        name: "Warped Planks",
                        src: "Warped_Planks.png",
                        collected: false
                    },
                    {
                        id: 15,
                        name: "Gunpowder",
                        src: "Gunpowder.png",
                        collected: true
                    },
                    {
                        id: 16,
                        name: "Paper",
                        src: "Paper.png",
                        collected: true
                    },
                    {
                        id: 17,
                        name: "Firework Star",
                        src: "Firework_Star.png",
                        collected: false
                    },
                    {
                        id: 18,
                        name: "Firework Rocket",
                        src: "Firework_Rocket.png",
                        collected: true
                    },
                    {
                        id: 19,
                        name: "Tripwire Hook",
                        src: "Tripwire_Hook.png",
                        collected: false
                    }
                ],
                profilePicture: [
                    {
                        id: "fox",
                        name: "Fox",
                        src: "Fox.png",
                        collected: true,
                        active: false
                    },
                    {
                        id: "enderman",
                        name: "Enderman",
                        src: "Enderman.png",
                        collected: true,
                        active: true
                    },
                    {
                        id: "chicken",
                        name: "Chicken",
                        src: "Chicken.png",
                        collected: false,
                        active: false
                    }
                ],
                profileBorder: [
                    {
                        id: "gold",
                        name: "Gold",
                        src: "Gold.png",
                        collected: true,
                        active: true
                    },
                    {
                        id: "amethyst",
                        name: "Amethyst",
                        src: "Amethyst.png",
                        collected: false,
                        active: false
                    },
                    {
                        id: "Iron",
                        name: "Iron",
                        src: "Iron.png",
                        collected: false,
                        active: false
                    }
                ],
                achievement: [
                    {
                        title: "First steps",
                        description: "You have collected your first item!",
                        icon: "Tutorial.png",
                        progress: 1,
                        goal: 1,
                        rarity: 1
                    },
                    {
                        title: "The Collector I",
                        description: "You have collected 30 item!",
                        icon: "Hardcore.png",
                        progress: 6,
                        goal: 30,
                        rarity: 2
                    },
                    {
                        title: "The Collector II",
                        description: "You have collected 50 item!",
                        icon: "Pocket.png",
                        progress: 6,
                        goal: 50,
                        rarity: 1
                    },
                    {
                        title: "???",
                        description: "???",
                        icon: "AllInOne.png",
                        progress: 2,
                        goal: 30,
                        rarity: 2
                    }
                ]
            }
        });
    }),

    // Handler for updating user profile
    http.put('http://localhost:3000/users/profile', () => {
        return HttpResponse.json({
            message: "Siker!"
        });
    })
];

/**
 * Sets up and starts the service worker.
 */
const worker = setupWorker(...handlers);
await worker.start();