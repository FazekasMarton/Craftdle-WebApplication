import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser'
import tutorial from "./assets/imgs/gamemodes/Tutorial.png"
import classic from "./assets/imgs/gamemodes/Classic.png"
import daily from "./assets/imgs/gamemodes/Daily.png"
import allinone from "./assets/imgs/gamemodes/All_in_One.png"
import pocket from "./assets/imgs/gamemodes/Pocket.png"
import resource from "./assets/imgs/gamemodes/Resource.png"
import hardcore from "./assets/imgs/gamemodes/Hardcore.png"
import { ISettings } from '../interfaces/ISettings';
import { IGamemode } from '../interfaces/IGamemode';
import gold from "./assets/imgs/profileBorders/Gold.png"
import fox from "./assets/imgs/profilepictures/Fox.png"
import op from "./assets/imgs/items/Oak_Planks.png"
import stick from "./assets/imgs/items/Stick.png"
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

export const handlers = [
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
        })
    }),

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
            }, { status: 400 })
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
        })
    }),

    http.post('http://localhost:3000/users/register', async ({ request }) => {
        let data: any = await request.json()

        if (data.username == "Test123") {
            return HttpResponse.json({
                message: {
                    error: {
                        username: ["Foglalt!"],
                        email: ["Nem valid!"],
                        password: ["Túl hosszú!"]
                    }
                }
            }, { status: 400 })
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
        })
    }),

    http.delete('http://localhost:3000/users/login', () => {
        return HttpResponse.json({
            message: "Siker!"
        })
    }),

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
        ]

        return HttpResponse.json({
            data: settings
        })
    }),

    http.put('http://localhost:3000/users/settings/:id', () => {
        return HttpResponse.json({
            message: "Siker!"
        })
    }),

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
                "icon": "Hardcore.png",
                "name": "Hardcore",
                "description": "Similar to Classic, but no hints are available, and the game is played with health points.",
                "difficulty": {
                    "name": "Insane",
                    "color": "AA0000"
                },
                "continueGame": true,
                "playedBefore": true
            }
        ]

        return HttpResponse.json({
            data: {
                gamemodes: gamemodes
            }
        })
    }),

    http.get('http://localhost:3000/profileBorders/:id', async () => {
        const buffer = await fetch(gold).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.arrayBuffer();
        });
        return HttpResponse.arrayBuffer(buffer, {
            headers: {
                'Content-Type': 'image/jpeg',
            },
        })
    }),

    http.get('http://localhost:3000/profilepictures/:id', async () => {
        const buffer = await fetch(fox).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.arrayBuffer();
        });
        return HttpResponse.arrayBuffer(buffer, {
            headers: {
                'Content-Type': 'image/jpeg',
            },
        })
    }),

    http.get('http://localhost:3000/gamemodes/:id', async ({ params }) => {
        let img = tutorial
        switch (params.id) {
            case "Classic.png":
                img = classic
                break;
            case "AllInOne.png":
                img = allinone
                break;
            case "Daily.png":
                img = daily
                break;
            case "Hardcore.png":
                img = hardcore
                break;
            case "Resource.png":
                img = resource
                break;
            case "Pocket.png":
                img = pocket
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
        })
    }),

    http.get('http://localhost:3000/items/:id', async ({ params }) => {
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
        })
    }),
];

const worker = setupWorker(...handlers)
await worker.start()