import { UserState } from "../features/user/userSlice";
import { IProfileImage } from "./IProfileImage";

export interface IResponse {
    response: boolean;
    data: {
        data: object,
        message: {
            errors: {
                [key: string]: string[]
            }
        }
    };
}

export interface IUser extends Omit<UserState, 'settings' | 'installed'> {
    username: string | null,
    loginToken: string | null,
    isGuest: boolean,
    stayLoggedIn: boolean,
    profilePicture: IProfileImage | null,
    profileBorder: IProfileImage | null,
}

export interface IPasswordChangeItem{
    item: {
        item_id: string,
        name: string,
        src: string
    }
}