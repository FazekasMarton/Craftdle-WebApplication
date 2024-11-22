import { useState } from 'react';
import { RootState } from '../../app/store';
import { useSelector } from "react-redux";

interface UserAuthNavProps{
    isLoggedIn: boolean,
    setForm: (value: boolean) => void
}

function UserAuthNav(props: UserAuthNavProps){
    const headers = ["Register", "Login"]
    if(props.isLoggedIn) headers.push("Logout")
    return <div id="userAuthNav">
        asd
    </div>
}

export function UserAuth(){
    const token = useSelector((state: RootState) => state.user.loginToken);
    const [form, setForm] = useState(false)
    return <div id="userAuth">
        <UserAuthNav isLoggedIn={token ? true : false} setForm={setForm} />
    </div>
}