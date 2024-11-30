import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser'
import desertFletcher from "./assets/imgs/profilePictures/Desert_Fletcher.png"
import amethyst from "./assets/imgs/profileBorders/Amethyst.png"
import { ISettings } from '../interfaces/ISettings';

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
                    src: desertFletcher
                },
                profileBorder: {
                    id: "border",
                    name: "test_border",
                    src: amethyst
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
                    src: desertFletcher
                },
                profileBorder: {
                    id: "border",
                    name: "test_border",
                    src: amethyst
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
                    src: desertFletcher
                },
                profileBorder: {
                    id: "border",
                    name: "test_border",
                    src: amethyst
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
                id: 55,
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
];

const worker = setupWorker(...handlers)
await worker.start()