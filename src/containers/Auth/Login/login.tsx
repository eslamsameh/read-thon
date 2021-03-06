import React, { useContext, useState } from 'react'
import { AuthHeader } from '../../../components/Auth/Header/authHeader'
import { RedButton } from '../../../components/Buttons/redButton';
import InputComponent from "../../../components/Input/input";
import { LoginStyles } from "./login.styles";
import { IconEmail } from '../../../assets/icons/Auth/icons-at';
import { IconsEye } from '../../../assets/icons/Auth/icons-eye';
import { LoginForm } from "../../../interfaces/loginForm";
import { loginValiadtionForm, loginValidation } from '../../../validations/loginFormValidation';
import { useHistory } from 'react-router-dom';
import { login } from '../../../services/auth.service';
import { UserContext } from '../../../Context/authContext';
import { handleFirstPageAfterLogin } from '../../PageRoute/handlePagesView';
export const Login = () => {
    const [form, setForm] = useState<LoginForm>({})
    const [error, setError] = useState<LoginForm>({})
    const { saveUser } = useContext<any>(UserContext)
    const history = useHistory();
    const inputChange = (state: string, placeholder: string, value: string) => {

        setForm({ ...form, [state]: value });
    }
    const inputValidation = (state: string, placeholder: string, value: string) => {
        const errorMessage = loginValidation(state, placeholder, value);
        if (errorMessage) setError({ ...error, [state]: errorMessage })
        else setError({ ...error, [state]: "" });
    }

    const renderInputs = (type: string, state: (keyof LoginForm), placeholder: string, name: string, Icon: React.FC, required: boolean) => {
        return <InputComponent
            error={error[state]}
            state={form[state]}
            type={type}
            placeholder={placeholder}
            value={form[state]}
            icon={Icon}
            required={required}
            onBlur={(v) => inputValidation(state, name, v)}
            onChange={(v) => inputChange(state, name, v)}
        />
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formValid = loginValiadtionForm(form);
        if (formValid.email || formValid.password) {
            setError({ ...error, ...formValid })
        } else {
            login(form).then((res) => {
                saveUser(res.data)
                const route = handleFirstPageAfterLogin(res?.data?.content)
                history.push(route || "/page/home")
            })
        }
    }
    return (
        <LoginStyles>
            <AuthHeader>Sign in to your account</AuthHeader>
            <div className={"formContainer"}>
                <form onSubmit={handleSubmit}>
                    <div className={"inputSpaces"}>
                        {renderInputs("text", "email", "Enter Your Email", "Email", IconEmail, true)}
                    </div>

                    <div className={"inputSpaces"}>
                        {renderInputs("password", "password", "Enter Your Password", "Password", IconsEye, true)}
                    </div>
                    <div className={"link"} onClick={() => history.push("/auth/forget/")}>
                        Forgot Password?
                </div>

                    <div className={"btnSpaces"}>
                        <RedButton type="submit">Login</RedButton>
                    </div>
                </form>
            </div>
        </LoginStyles>
    )
}


export default Login
