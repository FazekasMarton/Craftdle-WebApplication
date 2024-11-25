import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser'
import desertFletcher from "./assets/imgs/profilePictures/Desert_Fletcher.png"
import amethyst from "./assets/imgs/profileBorders/Amethyst.png"

export const handlers = [
    http.post('https://localhost:3000/users/login', async({ request }) => {
        let data: any = await request.json()
        
        if(data.username == "Test"){
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
                username: data.username,
                stayLoggedIn: data.stayLoggedIn,
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

    http.post('https://localhost:3000/users/register', async({ request }) => {
        let data: any = await request.json()
        
        if(data.username == "Test"){
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
];

const worker = setupWorker(...handlers)
await worker.start()