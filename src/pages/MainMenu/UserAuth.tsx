import { useState } from 'react';
import { RootState } from '../../app/store';
import { useSelector } from "react-redux";
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';

interface UserAuthNavProps {
    username: string,
    form: "Login" | "Register" | "Logout"
    setForm: (value: "Login" | "Register" | "Logout") => void
}

function UserAuthNav(props: UserAuthNavProps) {
    return <div id="userAuthNav">
        <Button color={props.form == "Login" ? "gray" : "green"} onClick={() => props.setForm("Login")}>Log In</Button>
        <Button color={props.form == "Register" ? "gray" : "green"} onClick={() => props.setForm("Register")}>Register</Button>
        {!/^Guest[0-9]+$/.test(props.username) ? <Button color={props.form == "Logout" ? "gray" : "green"} onClick={() => props.setForm("Logout")}>Log Out</Button> : null}
    </div>
}

function LoginForm() {
    return <form className='authForm'>
        <div className='authFormInputs'>
            <div>
                <label htmlFor="loginUsernameAndEmail">Username or Email:</label>
                <input type="text" id='registerUsername' />
            </div>
            <div>
                <label htmlFor="registerPassword">Password:</label>
                <input type="password" id='registerPassword' />
            </div>
            <div className='checkRow'>
                <input type="checkbox" id='rememberMe' />
                <label htmlFor="rememberMe">Remember Me</label>
            </div>
        </div>
        <Button color="green">Log In</Button>
    </form>
}

function RegisterForm() {
    return <form className='authForm'>
        <div className='authFormInputs'>
            <div>
                <label htmlFor="registerUsername">Username:</label>
                <input type="text" id='registerUsername' />
            </div>
            <div>
                <label htmlFor="registerEmail">Email:</label>
                <input type="email" id='registerEmail' />
            </div>
            <div>
                <label htmlFor="registerPassword">Password:</label>
                <input type="password" id='registerPassword' />
            </div>
            <div>
                <label htmlFor="registerPasswordConfirm">Confirm Password:</label>
                <input type="password" id='registerPasswordConfirm' />
            </div>
            <div className='checkRow'>
                <input type="checkbox" id='rememberMe' />
                <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <div className='checkRow'>
                <input type="checkbox" id='acceptTermsOfUse' />
                <label htmlFor="acceptTermsOfUse">I accept and agree to the <Link className='link' to="/docs#termsOfUse">Terms of Use</Link></label>
            </div>
        </div>
        <Button color="green">Register</Button>
    </form>
}

function LogoutForm() {
    return <form className='authForm'>
        <div>Are you sure you want to log out?</div>
        <Button color="green">Log Out</Button>
    </form>
}

function getForm(formName: "Login" | "Register" | "Logout") {
    switch (formName) {
        case "Login": return <LoginForm />
        case 'Register': return <RegisterForm />
        case 'Logout': return <LogoutForm />
    }
}

export function UserAuth() {
    const username = useSelector((state: RootState) => state.user.username);
    const [form, setForm] = useState<"Login" | "Register" | "Logout">("Login")
    return <div id="userAuth">
        <button id='authExit'></button>
        <UserAuthNav username={username || ""} form={form} setForm={setForm} />
        {getForm(form)}
    </div>
}