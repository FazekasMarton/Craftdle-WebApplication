import { useEffect, useState } from 'react';
import { RootState, store } from '../../app/store';
import { useSelector } from "react-redux";
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import { changePassword, forgotPassword, guestLogin, login, register } from '../../features/user/dataRequestSlice';
import { clearUser, saveUser } from '../../features/user/userSlice';
import { loadSettings } from '../../functions/loadSettings';
import { connectSocket } from '../../functions/connectSocket';
import { SoundEffect } from '../../classes/Audio';
import { IPasswordChangeItem, IResponse, IUser } from '../../interfaces/IResponse';

/**
 * Props for the UserAuthNav component.
 */
interface UserAuthNavProps {
    isGuest: boolean;
    form: "Login" | "Register" | "Logout" | "ForgotPassword";
    setForm: (value: "Login" | "Register" | "Logout" | "ForgotPassword") => void;
}

/**
 * Props for the InputField component.
 */
interface InputFieldProps {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    errors: string[];
}

/**
 * Props for the ChangePasswordInstruction component.
 */
interface ChangePasswordInstructionProps {
    item: {
        item_id: string;
        name: string;
        src: string;
    };
}

/**
 * Props for form components used in the UserAuth system.
 */
interface FormProps {
    /**
     * Function to control the visibility of the authentication form.
     * @param value - A boolean indicating whether to open or close the form.
     */
    openAuth: (value: boolean) => void;

    /**
     * Optional function to set the current form type.
     * @param value - The form type to set ("Login", "Register", "Logout", or "ForgotPassword").
     */
    setForm?: (value: "Login" | "Register" | "Logout" | "ForgotPassword") => void;
}

/**
 * Utility function to validate input fields based on rules.
 * @param value - The value to validate.
 * @param rules - An array of validation rules.
 * @returns An array of error messages.
 */
function validateField(value: string, rules: { required?: boolean, minLength?: number, maxLength?: number, regex?: RegExp, errorMessage: string }[]): string[] {
    const errors = [];
    for (const rule of rules) {
        if (rule.required && !value) {
            errors.push(rule.errorMessage);
        }
        if (rule.minLength && value.length < rule.minLength) {
            errors.push(rule.errorMessage);
        }
        if (rule.maxLength && value.length > rule.maxLength) {
            errors.push(rule.errorMessage);
        }
        if (rule.regex && !rule.regex.test(value)) {
            errors.push(rule.errorMessage);
        }
    }
    return errors;
}

/**
 * Reusable InputField component for rendering input fields with validation errors.
 * @param props - The properties for the InputField component.
 * @returns The InputField component.
 */
function InputField(props: InputFieldProps) {
    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <input type={props.type} id={props.id} onChange={(e) => props.onChange(e.currentTarget.value)} value={props.value} />
            <ul className='inputError'>
                {props.errors.map((err, index) => <li key={index}>{err}</li>)}
            </ul>
        </div>
    );
}

/**
 * UserAuthNav component to display navigation buttons for user authentication.
 * @param props - The properties for the UserAuthNav component.
 * @returns The UserAuthNav component.
 */
function UserAuthNav(props: UserAuthNavProps) {
    const buttons = [
        { label: "Log In", form: "Login" },
        { label: "Sign Up", form: "Register" },
        { label: "Log Out", form: "Logout", condition: !props.isGuest }
    ];
    return (
        <div id="userAuthNav">
            {buttons.map(({ label, form: btnForm, condition = true }) =>
                condition && (
                    <Button
                        key={btnForm}
                        color={props.form === btnForm ? "gray" : "green"}
                        onClick={() => { props.setForm(btnForm as UserAuthNavProps['form']); }}
                    >
                        {label}
                    </Button>
                )
            )}
        </div>
    );
}

/**
 * LoginForm component to handle user login.
 * @param props - The properties for the LoginForm component.
 * @returns The LoginForm component.
 */
function LoginForm(props: FormProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({ username: [] as string[], password: [] as string[] });

    /**
     * Handles the login form submission.
     */
    async function handleSubmit() {
        const usernameErrors = validateField(username, [{ required: true, errorMessage: "Username cannot be empty!" }]);
        const passwordErrors = validateField(password, [{ required: true, errorMessage: "Password cannot be empty!" }]);
        setErrors({ username: usernameErrors, password: passwordErrors });

        if (!usernameErrors.length && !passwordErrors.length) {
            const response = await store.dispatch(login({ usernameOrEmail: username, password, stayLoggedIn: rememberMe }));
            const res = response.payload as IResponse;
            if (res.response) {
                await store.dispatch(clearUser(true));
                await store.dispatch(saveUser(res.data.data as IUser));
                setUsername("");
                setPassword("");
                setRememberMe(false);
                props.openAuth(false);
                loadSettings();
                connectSocket();
            } else {
                setErrors({
                    username: res.data.message.errors.username || [],
                    password: res.data.message.errors.password || []
                });
            }
        }
    }

    return (
        <div className='authForm'>
            <InputField id="loginUsernameAndEmail" label="Username or Email:" type="text" value={username} onChange={setUsername} errors={errors.username} />
            <InputField id="loginPassword" label="Password:" type="password" value={password} onChange={setPassword} errors={errors.password} />
            <span id='forgotPassword' onClick={() => {
                if (props.setForm) {
                    props.setForm("ForgotPassword");
                }
            }}>Forgot password?</span>
            <div className='checkRow'>
                <input type="checkbox" id='rememberMe' onChange={(e) => { setRememberMe(e.currentTarget.checked); }} checked={rememberMe} />
                <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <Button color="green" onClick={handleSubmit}>Log In</Button>
        </div>
    );
}

/**
 * ForgotPasswordForm component to handle the forgot password process.
 * @param props - The properties for the ForgotPasswordForm component.
 * @returns The ForgotPasswordForm component.
 */
function ForgotPasswordForm(props: FormProps) {
    const socket = useSelector((state: RootState) => state.socket.socket);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState<Array<string>>([]);
    const [socketResponse, setSocketResponse] = useState<{ token: string, success: boolean } | null>(null);
    const [item, setItem] = useState<{ item_id: string, name: string, src: string } | null>(null);

    useEffect(() => {
        if (socket) {
            socket.on("userVerification", (data: { token: string, success: boolean }) => {
                setSocketResponse(data);
            });

            return () => {
                socket.off("userVerification");
            };
        }
    }, [socket]);

    /**
     * Validates the email format.
     * @param email - The email to validate.
     * @returns An array of error messages.
     */
    function validateEmail(email: string): Array<string> {
        const errors = [];
        if (!/\S+@\S+\.\S+/.test(email)) {
            errors.push("Email must be valid!");
        }
        return errors;
    }

    /**
     * Handles sending the forgot password email.
     */
    async function handleSendEmail() {
        const errors = validateEmail(email);
        setEmailError(errors);
        setItem(null);
        setSocketResponse(null)

        if (errors.length === 0) {
            const response = await store.dispatch(forgotPassword(email));
            const res = response.payload as IResponse;

            if (res.response) {
                setItem((res.data.data as IPasswordChangeItem).item);
            } else {
                setEmailError(res.data.message.errors.email || []);
            }
        }
    }

    return (
        <div className="authForm">
            {socketResponse ? (
                socketResponse.success ? (
                    <>
                        <h2>Verification successful</h2>
                        <PasswordChangeForm token={socketResponse.token} setForm={props.setForm} />
                    </>
                ) : (
                    <>
                        <h2>Verification failed</h2>
                        <Button color="green" onClick={handleSendEmail}>
                            {item ? "Resend Email" : "Send Email"}
                        </Button>
                    </>
                )
            ) : (
                <>
                    <div>
                        <label htmlFor="forgotPasswordEmail">Email:</label>
                        <input
                            type="email"
                            id="forgotPasswordEmail"
                            onChange={(e) => { setEmail(e.currentTarget.value); }}
                            value={email}
                        />
                        <ul className="inputError">
                            {emailError.map((err, index) => (
                                <li key={index}>{err}</li>
                            ))}
                        </ul>
                    </div>
                    {item && <ChangePasswordInstruction item={item} />}
                    <Button color="green" onClick={handleSendEmail}>
                        {item ? "Resend Email" : "Send Email"}
                    </Button>
                </>
            )}
        </div>
    );
}

interface PasswordChangeFormProps {
    token: string;
    setForm?: (value: "Login" | "Register" | "Logout" | "ForgotPassword") => void;
}

/**
 * PasswordChangeForm component to handle password change.
 * @param props - The properties for the PasswordChangeForm component.
 * @returns The PasswordChangeForm component.
 */
function PasswordChangeForm(props: PasswordChangeFormProps) {
    const [password, setPassword] = useState("")
    const [passwordC, setPasswordC] = useState("")
    const [passwordError, setPasswordError] = useState<Array<string>>([])
    const [passwordCError, setPasswordCError] = useState<Array<string>>([])
    return <div className='authForm'>
        <div>
            <label htmlFor="changePassword">New Password:</label>
            <input type="password" id='changePassword' onChange={(e) => { setPassword(e.currentTarget.value) }} value={password} />
            <ul className='inputError'>{
                passwordError?.map((err, index) => {
                    return <li key={index}>{err}</li>
                })
            }</ul>
        </div>
        <div>
            <label htmlFor="changePasswordConfirm">Confirm Password:</label>
            <input type="password" id='changePasswordConfirm' onChange={(e) => { setPasswordC(e.currentTarget.value) }} value={passwordC} />
            <ul className='inputError'>{
                passwordCError?.map((err, index) => {
                    return <li key={index}>{err}</li>
                })
            }</ul>
        </div>
        <Button color="green" onClick={async () => {
            const passwordErr = []
            if (password.length < 5 || password.length > 16) {
                passwordErr.push("Password must be between 5 and 16 characters!")
            }
            setPasswordError(passwordErr)
            const passwordCErr = []
            if (password != passwordC) {
                passwordCErr.push("Passwords and confirm password are not matching!")
            }
            setPasswordCError(passwordCErr)
            const errors = [passwordErr, passwordCErr]
            if (errors.every((error) => { return error.length === 0 })) {
                const response = await store.dispatch(changePassword({
                    password: password,
                    token: props.token
                }))
                const res = (response.payload as IResponse)
                if (res.response) {
                    setPassword("")
                    setPasswordC("")
                    if (props.setForm) props.setForm("Login")
                } else {
                    if (res.data.message.errors.password) {
                        setPasswordError(res.data.message.errors.password)
                    }
                }
            }
        }}>Change Password</Button>
    </div>
}

/**
 * Props for the ChangePasswordInstruction component.
 */
interface ChangePasswordInstructionProps {
    item: {
        item_id: string;
        name: string;
        src: string;
    };
}

/**
 * ChangePasswordInstruction component to display instructions for resetting the password.
 * @param item - The item to verify the user.
 * @returns The ChangePasswordInstruction component.
 */
function ChangePasswordInstruction({ item }: ChangePasswordInstructionProps) {
    return (
        <div id="forgotPasswordItemContainer">
            <img
                id="forgotPasswordItem"
                src={`${import.meta.env.VITE_SERVER_URL}/assets/items/${item.src}`}
                alt={item.name}
                draggable={false}
            />
            <h2 id="forgotPasswordTitle">Email Sent!</h2>
            <div id="forgotPasswordText">
                <p>
                    We've sent an email to the address you provided. The email contains three Minecraft
                    items—select the correct one as shown on this page to complete the password reset
                    process.
                </p>
                <p>
                    If you don't see the email, please check your spam or promotions folder!
                </p>
            </div>
        </div>
    );
}

/**
 * RegisterForm component to handle user registration.
 * @param props - The properties for the RegisterForm component.
 * @returns The RegisterForm component.
 */
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
            <label htmlFor="acceptTermsOfUse">I accept and agree to the <Link className='link' to="/docs#privacyPolicy" target='blank'>Privacy Policy</Link> and the <Link className='link' to="/docs#termsOfUse" target='blank'>Terms of Use</Link></label>
            <ul className='inputError'>{
                acceptError?.map((err, index) => {
                    return <li key={index}>{err}</li>
                })
            }</ul>
        </div>
        <Button color="green" onClick={async () => {
            const usernameErr = []
            if (username.length < 5 || username.length > 16) {
                usernameErr.push("Username must be between 5 and 16 characters!")
            }
            if (!/^[A-Za-z0-9.,;:$#!/?%&()]+$/.test(username)) {
                usernameErr.push("Username can only contain alphanumeric and these special characters: . , ; : $ # ! / ? % & ( )")
            }
            setUsernameError(usernameErr)
            const emailErr = []
            if (!/\S+@\S+\.\S+/.test(email)) {
                emailErr.push("Email must be valid!")
            }
            setEmailError(emailErr)
            const passwordErr = []
            if (password.length < 5 || password.length > 16) {
                passwordErr.push("Password must be between 5 and 16 characters!")
            }
            setPasswordError(passwordErr)
            const passwordCErr = []
            if (password != passwordC) {
                passwordCErr.push("Passwords and confirm password are not matching!")
            }
            setPasswordCError(passwordCErr)
            const acceptErr = []
            if (!acceptTOU) {
                acceptErr.push("Terms of Use must be accepted to create an account!")
            }
            setAcceptError(acceptErr)
            const errors = [usernameErr, emailErr, passwordErr, passwordCErr, acceptErr]
            if (errors.every((error) => { return error.length === 0 })) {
                const response = await store.dispatch(register({
                    username: username,
                    email: email,
                    password: password,
                    stayLoggedIn: rememberMe
                }))
                const res = (response.payload as IResponse)
                if (res.response) {
                    await store.dispatch(clearUser(true))
                    await store.dispatch(saveUser(res.data.data as IUser))
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
                    if (res.data.message.errors.username) {
                        setUsernameError(res.data.message.errors.username)
                    }
                    if (res.data.message.errors.email) {
                        setEmailError(res.data.message.errors.email)
                    }
                    if (res.data.message.errors.password) {
                        setPasswordError(res.data.message.errors.password)
                    }
                }
            }
        }}>Sign Up</Button>
    </div>
}

/**
 * LogoutForm component to handle user logout.
 * @param props - The properties for the LogoutForm component.
 * @returns The LogoutForm component.
 */
function LogoutForm(props: FormProps) {
    return <div className='authForm'>
        <div>Are you sure you want to log out?</div>
        <Button color="green" onClick={async () => {
            await store.dispatch(clearUser(true))
            props.openAuth(false)
            const response = await store.dispatch(guestLogin())
            const res = (response.payload as IResponse)
            await store.dispatch(saveUser(res.data.data as IUser))
            connectSocket()
        }}>Log Out</Button>
    </div>
}

/**
 * Get the appropriate form component based on the form name.
 * @param formName - The name of the form.
 * @param openAuth - The function to open the authentication form.
 * @returns The form component.
 */
function getForm(formName: "Login" | "Register" | "Logout" | "ForgotPassword", openAuth: (value: boolean) => void, setForm: (value: "Login" | "Register" | "Logout" | "ForgotPassword") => void) {
    switch (formName) {
        case "Login": return <LoginForm openAuth={openAuth} setForm={setForm} />
        case 'Register': return <RegisterForm openAuth={openAuth} />
        case 'Logout': return <LogoutForm openAuth={openAuth} />
        case 'ForgotPassword': return <ForgotPasswordForm openAuth={openAuth} setForm={setForm} />
    }
}

/**
 * Props for the UserAuth component.
 */
interface UserAuthProps {
    openAuth: (value: boolean) => void;
}

/**
 * UserAuth component to handle user authentication.
 * @param props - The properties for the UserAuth component.
 * @returns The UserAuth component.
 */
export function UserAuth(props: UserAuthProps) {
    const isGuest = useSelector((state: RootState) => state.user.isGuest);
    const [form, setForm] = useState<"Login" | "Register" | "Logout" | "ForgotPassword">("Login")
    return <div id="userAuth">
        <button id='authExit' onClick={() => { props.openAuth(false); SoundEffect.play("click") }}></button>
        <UserAuthNav isGuest={isGuest} form={form} setForm={setForm} />
        {getForm(form, props.openAuth, setForm)}
    </div>
}