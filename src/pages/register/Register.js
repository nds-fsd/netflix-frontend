import React from 'react'
import {useForm} from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import {hasUserSession} from "../../utils/sesion";

const Register = () => {
const {register, handleSubmit} = useForm()

const authRegister = ({password, passwordConfirm}) => {
!password === passwordConfirm ? Navigate('/register') : Navigate('/')

}

    return (
        <>
            {hasUserSession() && <Navigate to="/home" replace />}
            {!hasUserSession() && (<div>
                <form onSubmit={handleSubmit(authRegister)}>
                    <input {...register("email", { required: true }) } type="email" placeholder='Your email' />
                    <input {...register("password", { required: true }) } type="password" placeholder='Your password' />
                    <input {...register("confirmPassword", { required: true }) } type="password" placeholder='Repeat your password' />
                </form>
            </div>)}
        </>

    )
}

export default Register;
