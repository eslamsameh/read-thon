import React, {useState} from 'react'
import { LoginStyles } from "../Login/login.styles";
import { IconsEye } from '../../../assets/icons/Auth/icons-eye';
import { AuthHeader } from '../../../components/Auth/Header/authHeader'
import { RedButton } from '../../../components/Buttons/redButton';
import InputComponent from "../../../components/Input/input";
import { ResetPasswordForm } from '../../../interfaces/resetPasswordForm';
import { resetPasswordValidation, resePasswordValiadtionForm } from '../../../validations/resetPasswordFormValidation';
import { useHistory, useParams } from 'react-router-dom';
import { resetPasswordApi } from "../../../services/auth.service";
export const ResetPassword = () => {
    const [form, setForm] = useState<ResetPasswordForm>({})
    const [error, setError] = useState<ResetPasswordForm>({})
    const token = useParams<any>().id;
    const history = useHistory();
    const inputChange = (state: string, placeholder: string, value: string) => {
       
        setForm({ ...form, [state]: value });
    }
    const inputValidation = (state: string, placeholder: string, value: string) => {
        const errorMessage = resetPasswordValidation(state, placeholder, value);
        if (errorMessage) setError({ ...error, [state]: errorMessage })
        else setError({ ...error, [state]: "" });

    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formValid = resePasswordValiadtionForm(form);
        if (formValid.password || formValid.confirmPassword) {
            setError({...error, ...formValid})
        } else {
            resetPasswordApi(form, token).then(() => history.push("/auth/login"));
            
        }
    }


    const renderInputs = (type: string, state: (keyof ResetPasswordForm), placeholder: string, name: string, Icon: React.FC, required: boolean) => {
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
   
    return (
        <div>
            
            <LoginStyles>
            <AuthHeader>Change your Password</AuthHeader>
            <div className={"formContainer"}>
                <form onSubmit={handleSubmit}>
                   
                    <div className={"inputSpaces"}>
                        {renderInputs("password", "password", "New Password", "Password", IconsEye, true)}
                    </div>
                    <div className={"inputSpaces"}>
                        {renderInputs("password", "confirmPassword", "Confirm New Password", "Password", IconsEye, true)}
                    </div>
                   
                

                    <div className={"btnSpaces"}>
                        <RedButton type="submit">Change</RedButton>
                    </div>
                </form>
            </div>
            </LoginStyles>
        </div>
    )
}
