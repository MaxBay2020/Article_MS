import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    email: yup.string().email().required('Please enter your email'),
    password: yup.string().required('Please enter your password')
})

export const registerSchema = yup.object().shape({
    email: yup.string().email().required('Please enter your email'),
    password: yup.string().min(6).max(15).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null])
})
