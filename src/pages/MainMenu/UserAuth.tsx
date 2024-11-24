import { useState } from 'react';
import { RootState } from '../../app/store';
import { useSelector } from "react-redux";
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';

interface UserAuthNavProps {
    isGuest: boolean,
    form: "Login" | "Register" | "Logout"
    setForm: (value: "Login" | "Register" | "Logout") => void
}

function UserAuthNav(props: UserAuthNavProps) {
    return <div id="userAuthNav">
        <Button color={props.form == "Login" ? "gray" : "green"} onClick={() => props.setForm("Login")}>Log In</Button>
        <Button color={props.form == "Register" ? "gray" : "green"} onClick={() => props.setForm("Register")}>Register</Button>
        {!props.isGuest ? <Button color={props.form == "Logout" ? "gray" : "green"} onClick={() => props.setForm("Logout")}>Log Out</Button> : null}
    </div>
}

function LoginForm() {
    return <div className='authForm'>
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
    </div>
}

function RegisterForm() {
    return <div className='authForm'>
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
    </div>
}

function LogoutForm() {
    return <div className='authForm'>
        <div>Are you sure you want to log out?</div>
        <Button color="green">Log Out</Button>
    </div>
}

function getForm(formName: "Login" | "Register" | "Logout") {
    switch (formName) {
        case "Login": return <LoginForm />
        case 'Register': return <RegisterForm />
        case 'Logout': return <LogoutForm />
    }
}

interface UserAuthProps{
    openAuth: (value: boolean) => void
}

export function UserAuth(props: UserAuthProps) {
    const isGuest = useSelector((state: RootState) => state.user.isGuest);
    const [form, setForm] = useState<"Login" | "Register" | "Logout">("Login")
    return <div id="userAuth">
        <button id='authExit' onClick={() => props.openAuth(false)}></button>
        <UserAuthNav isGuest={isGuest} form={form} setForm={setForm} />
        {getForm(form)}
    </div>
}