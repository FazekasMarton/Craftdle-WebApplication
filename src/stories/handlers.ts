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

export const handlers = [
    http.get('https://localhost:3000/users/login', () => {
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

    http.post('https://localhost:3000/users/login', async ({ request }) => {
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

    http.post('https://localhost:3000/users/register', async ({ request }) => {
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

    http.delete('https://localhost:3000/users/login', () => {
        return HttpResponse.json({
            message: "Siker!"
        })
    }),

    http.get('https://localhost:3000/users/settings', () => {
        const settings: ISettings[] = [
            {
                id: 45,
                volume: 0,
                imagesSize: 10,
                isSet: true,
                controls: {
                    copy: "Left Mouse Button",
                    remove: "Right Click Button",
                    isTapMode: false,
                    teableMapping: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                }
            },
            {
                id: 52,
                volume: 0,
                imagesSize: 10,
                isSet: false,
                controls: {
                    copy: "Left Mouse Button",
                    remove: "Right Click Button",
                    isTapMode: false,
                    teableMapping: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                }
            },
            {
                id: 56,
                volume: 0,
                imagesSize: 10,
                isSet: false,
                controls: {
                    copy: "Left Mouse Button",
                    remove: "Right Click Button",
                    isTapMode: false,
                    teableMapping: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                }
            }
        ]

        return HttpResponse.json({
            data: settings
        })
    }),

    http.put('https://localhost:3000/users/settings/:id', () => {
        return HttpResponse.json({
            message: "Siker!"
        })
    }),

    http.get('https://localhost:3000/game/singleplayer', () => {
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

    http.get('https://localhost:3000/profileBorders/:id', async () => {
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

    http.get('https://localhost:3000/profilepictures/:id', async () => {
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

    http.get('https://localhost:3000/gamemodes/:id', async ({ params }) => {
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

    http.get('https://localhost:3000/items/:id', async ({ params }) => {
        console.log("asd")
        let img = op
        switch (params.id) {
            case "Oak_Planks.png":
                img = op
                break;
            case "Stick.png":
                img = stick
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
];

const worker = setupWorker(...handlers)
await worker.start()