import { useState } from 'react';
import { RootState, store } from '../../app/store';
import { useSelector } from "react-redux";
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import { guestLogin, login, logout, register } from '../../features/user/dataRequestSlice';
import { clearUser, saveUser } from '../../features/user/userSlice';
import { loadSettings } from '../../functions/loadSettings';
import { connectSocket } from '../../functions/connectSocket';

interface UserAuthNavProps {
    isGuest: boolean,
    form: "Login" | "Register" | "Logout"
    setForm: (value: "Login" | "Register" | "Logout") => void
}

function UserAuthNav(props: UserAuthNavProps) {
    return <div id="userAuthNav">
        <Button color={props.form == "Login" ? "gray" : "green"} onClick={() => props.setForm("Login")}>Log In</Button>
        <Button color={props.form == "Register" ? "gray" : "green"} onClick={() => props.setForm("Register")}>Sign In</Button>
        {!props.isGuest ? <Button color={props.form == "Logout" ? "gray" : "green"} onClick={() => props.setForm("Logout")}>Log Out</Button> : null}
    </div>
}

interface FormProps {
    openAuth: (value: boolean) => void;
}

function LoginForm(props: FormProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [usernameError, setUsernameError] = useState<Array<string>>()
    const [passwordError, setPasswordError] = useState<Array<string>>()
    return <div className='authForm'>
        <div>
            <label htmlFor="loginUsernameAndEmail">Username or Email:</label>
            <input type="text" id='loginUsernameAndEmail' onChange={(e) => { setUsername(e.currentTarget.value) }} value={username} />
            <ul className='inputError'>{
                usernameError?.map((err, index) => {
                    return <li key={index}>{err}</li>
                })
            }</ul>
        </div>
        <div>
            <label htmlFor="loginPassword">Password:</label>
            <input type="password" id='loginPassword' onChange={(e) => { setPassword(e.currentTarget.value) }} value={password} />
            <ul className='inputError'>{
                passwordError?.map((err, index) => {
                    return <li key={index}>{err}</li>
                })
            }</ul>
        </div>
        <div className='checkRow'>
            <input type="checkbox" id='rememberMe' onChange={(e) => { setRememberMe(e.currentTarget.checked) }} checked={rememberMe} />
            <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <Button color="green" onClick={async () => {
            let usernameErr = []
            if (username.length <= 0) {
                usernameErr.push("Username cannot be empty!")
            }
            setUsernameError(usernameErr)
            let passwordErr = []
            if (password.length <= 0) {
                passwordErr.push("Password cannot be empty!")
            }
            setPasswordError(passwordErr)
            let errors = [usernameErr, passwordErr]
            if (errors.every(error => error.length === 0)) {
                let response = await store.dispatch(login({
                    usernameOrEmail: username,
                    password: password,
                    stayLoggedIn: rememberMe
                }))
                let res = (response.payload as any)
                if (res.response) {
                    await store.dispatch(saveUser(res.data.data))
                    setUsername("")
                    setPassword("")
                    setRememberMe(false)
                    props.openAuth(false)
                    loadSettings()
                    connectSocket()
                } else {
                    res.data.message.errors.username ? setUsernameError(res.data.message.errors.username) : setUsernameError([])
                    res.data.message.errors.password ? setPasswordError(res.data.message.errors.password) : setPasswordError([])
                }
            }
        }}>Log In</Button>
    </div>
}

function RegisterForm(props: FormProps) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordC, setPasswordC] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const [acceptTOU, setAcceptTOU] = useState(false)
    const [usernameError, setUsernameError] = useState<Array<string>>([])
    const [emailError, setEmailError] = useState<Array<string>>([])
    const [passwordError, setPasswordError] = useState<Array<string>>([])
    const [passwordCError, setPasswordCError] = useState<Array<string>>([])
    const [acceptError, setAcceptError] = useState<Array<string>>([])
    return <div className='authForm'>
        <div>
            <label htmlFor="registerUsername">Username:</label>
            <input type="text" id='registerUsername' onChange={(e) => { setUsername(e.currentTarget.value) }} value={username} />
            <ul className='inputError'>{
                usernameError?.map((err, index) => {
                    return <li key={index}>{err}</li>
                })
            }</ul>
        </div>
        <div>
            <label htmlFor="registerEmail">Email:</label>
            <input type="email" id='registerEmail' onChange={(e) => { setEmail(e.currentTarget.value) }} value={email} />
            <ul className='inputError'>{
                emailError?.map((err, index) => {
                    return <li key={index}>{err}</li>
                })
            }</ul>
        </div>
        <div>
            <label htmlFor="registerPassword">Password:</label>
            <input type="password" id='registerPassword' onChange={(e) => { setPassword(e.currentTarget.value) }} value={password} />
            <ul className='inputError'>{
                passwordError?.map((err, index) => {
                    return <li key={index}>{err}</li>
                })
            }</ul>
        </div>
        <div>
            <label htmlFor="registerPasswordConfirm">Confirm Password:</label>
            <input type="password" id='registerPasswordConfirm' onChange={(e) => { setPasswordC(e.currentTarget.value) }} value={passwordC} />
            <ul className='inputError'>{
                passwordCError?.map((err, index) => {
                    return <li key={index}>{err}</li>
                })
            }</ul>
        </div>
        <div className='checkRow'>
            <input type="checkbox" id='rememberMe' onChange={(e) => { setRememberMe(e.currentTarget.checked) }} checked={rememberMe} />
            <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <div className='checkRow'>
            <input type="checkbox" id='acceptTermsOfUse' onChange={(e) => { setAcceptTOU(e.currentTarget.checked) }} checked={acceptTOU} />
            <label htmlFor="acceptTermsOfUse">I accept and agree to the <Link className='link' to="/docs#privacyPolicy">Privacy Policy</Link> and the <Link className='link' to="/docs#termsOfUse">Terms of Use</Link></label>
            <ul className='inputError'>{
                acceptError?.map((err, index) => {
                    return <li key={index}>{err}</li>
                })
            }</ul>
        </div>
        <Button color="green" onClick={async () => {
            let usernameErr = []
            if (username.length < 5 || username.length > 16) {
                usernameErr.push("Username must be between 5 and 16 characters!")
            }
            if (!/^[A-Za-z0-9.,;:$#!/?%&()]+$/.test(username)) {
                usernameErr.push("Username can only contain alphanumeric and these special characters: . , ; : $ # ! / ? % & ( )")
            }
            setUsernameError(usernameErr)
            let emailErr = []
            if (!/\S+@\S+\.\S+/.test(email)) {
                emailErr.push("Email must be valid!")
            }
            setEmailError(emailErr)
            let passwordErr = []
            if (password.length < 5 || password.length > 16) {
                passwordErr.push("Password must be between 5 and 16 characters!")
            }
            setPasswordError(passwordErr)
            let passwordCErr = []
            if (password != passwordC) {
                passwordCErr.push("Passwords and confirm password are not matching!")
            }
            setPasswordCError(passwordCErr)
            let acceptErr = []
            if (!acceptTOU) {
                acceptErr.push("Terms of Use must be accepted to create an account!")
            }
            setAcceptError(acceptErr)
            let errors = [usernameErr, emailErr, passwordErr, passwordCErr, acceptErr]
            if (errors.every(error => error.length === 0)) {
                let response = await store.dispatch(register({
                    username: username,
                    email: email,
                    password: password,
                    stayLoggedIn: rememberMe
                }))
                let res = (response.payload as any)
                if (res.response) {
                    await store.dispatch(saveUser(res.data.data))
                    setUsername("")
                    setEmail("")
                    setPassword("")
                    setPasswordC("")
                    setRememberMe(false)
                    setAcceptTOU(false)
                    props.openAuth(false)
                    loadSettings()
                    connectSocket()
                } else {
                    res.data.message.errors.username ? setUsernameError(res.data.message.errors.username) : setUsernameError([])
                    res.data.message.errors.email ? setEmailError(res.data.message.errors.email) : setEmailError([])
                    res.data.message.errors.password ? setPasswordError(res.data.message.errors.password) : setPasswordError([])
                }
            }
        }}>Sign In</Button>
    </div>
}

function LogoutForm(props: FormProps) {
    return <div className='authForm'>
        <div>Are you sure you want to log out?</div>
        <Button color="green" onClick={async() => {
            let response = await store.dispatch(logout())
            let res = (response.payload as any)
            if (res.response) {
                await store.dispatch(clearUser(true))
                props.openAuth(false)
                let response = await store.dispatch(guestLogin())
                let res = (response.payload as any)
                await store.dispatch(saveUser(res.data.data))
                connectSocket()
            }
        }}>Log Out</Button>
    </div>
}

function getForm(formName: "Login" | "Register" | "Logout", openAuth: (value: boolean) => void) {
    switch (formName) {
        case "Login": return <LoginForm openAuth={openAuth} />
        case 'Register': return <RegisterForm openAuth={openAuth} />
        case 'Logout': return <LogoutForm openAuth={openAuth} />
    }
}

interface UserAuthProps {
    openAuth: (value: boolean) => void;
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