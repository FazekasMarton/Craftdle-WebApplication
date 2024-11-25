import { useState } from 'react';
import { RootState, store } from '../../app/store';
import { useSelector } from "react-redux";
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import { login } from '../../features/user/dataRequestSlice';
import { saveUser } from '../../features/user/userSlice';

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

interface FormProps{
    openAuth: (value: boolean) => void
}

function LoginForm(props: FormProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [usernameError, setUsernameError] = useState<string>()
    const [passwordError, setPasswordError] = useState<string>()
    return <div className='authForm'>
        <div>
            <label htmlFor="loginUsernameAndEmail">Username or Email:</label>
            <input type="text" id='registerUsername' onChange={(e) => {setUsername(e.currentTarget.value)}} value={username}/>
            <div className='inputError'>{usernameError}</div>
        </div>
        <div>
            <label htmlFor="loginPassword">Password:</label>
            <input type="password" id='loginPassword' onChange={(e) => {setPassword(e.currentTarget.value)}} value={password}/>
            <div className='inputError'>{passwordError}</div>
        </div>
        <div className='checkRow'>
            <input type="checkbox" id='rememberMe' onChange={(e) => {setRememberMe(e.currentTarget.checked)}} checked={rememberMe}/>
            <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <Button color="green" onClick={async() => {
            if(username == "") setUsernameError("Username cannot be empty!")
            if(password == "") setPasswordError("Password cannot be empty!")
            if(usernameError == "" && passwordError == ""){
                let response = await store.dispatch(login({
                    username: username,
                    password: password,
                    stayLoggedIn: rememberMe
                }))
                let res = (response.payload as any)
                if(res.response == 200){
                    store.dispatch(saveUser(res.data.data))
                    setUsername("")
                    setPassword("")
                    setRememberMe(false)
                    props.openAuth(false)
                }else{
                    res.data.message.error.username ? setUsernameError(res.data.message.error.username) : setUsernameError("")
                    res.data.message.error.password ? setPasswordError(res.data.message.error.password) : setPasswordError("")
                }
            }
        }}>Log In</Button>
    </div>
}

function RegisterForm(props: FormProps) {
    return <div className='authForm'>
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
        <Button color="green">Register</Button>
    </div>
}

function LogoutForm(props: FormProps) {
    return <div className='authForm'>
        <div>Are you sure you want to log out?</div>
        <Button color="green">Log Out</Button>
    </div>
}

function getForm(formName: "Login" | "Register" | "Logout", openAuth: (value: boolean) => void) {
    switch (formName) {
        case "Login": return <LoginForm openAuth={openAuth}/>
        case 'Register': return <RegisterForm openAuth={openAuth}/>
        case 'Logout': return <LogoutForm openAuth={openAuth}/>
    }
}

interface UserAuthProps {
    openAuth: (value: boolean) => void
}

export function UserAuth(props: UserAuthProps) {
    const isGuest = useSelector((state: RootState) => state.user.isGuest);
    const [form, setForm] = useState<"Login" | "Register" | "Logout">("Login")
    return <div id="userAuth">
        <button id='authExit' onClick={() => props.openAuth(false)}></button>
        <UserAuthNav isGuest={isGuest} form={form} setForm={setForm} />
        {getForm(form, props.openAuth)}
    </div>
}