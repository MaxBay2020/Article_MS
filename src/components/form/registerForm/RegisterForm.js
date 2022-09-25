import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {registerSchema} from "../../../schema/authSchema";
import {Button, Container, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import '../authForm.scss'
import Logo from "../../logo/Logo";
import {Link, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useEffect, useState} from "react";
import {login} from "../../../features/userSlice/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useAddUser} from "../../../hooks/useMutateUser";
import bcrypt from 'bcryptjs'
import axios from "../../../utils/axios";
import {toast, ToastContainer} from "react-toastify";

const styles = {
    width: '100%'
}

const RegisterForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(registerSchema)
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const notify = (message) => (toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }))

    const user = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {mutate: adduser} = useAddUser()


    useEffect(() => {
        user.email && navigate('/')
    }, [user]);

    const findUserByEmail = async email => {
        const res = await axios.get(`/users?email=${email}`)
        if(res.status === 200)
            return res.data
    }

    const registerUser = async newUser => {
        const theUser = await findUserByEmail(newUser.email)
        if(theUser.length === 1){
            notify('Email exists!')
            return
        }

        bcrypt.hash(newUser.password, 8, (err, hash) => {
            const {confirmPassword, ...rest} = newUser
            const newUserHashed = {
                ...rest,
                password: hash
            }
            adduser(newUserHashed)
            dispatch(login(newUserHashed))
            navigate('/')
        })
    }

    return (
        <Container maxWidth='sm' className='formContainer'>
            <Grid
                container
                direction="column"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={4}
            >
                <Grid item><Logo width={'100px'} /></Grid>
                <Grid item><Typography variant='h3'>Register</Typography></Grid>

                {/* email */}
                <Grid item sx={styles}>
                    <Grid container sx={styles} alignItems='center' justifyContent='space-between' spacing={1}>
                        <Grid item xs={4}>
                            <label htmlFor="email"><Typography variant='h4'>email</Typography></label>
                        </Grid>
                        <Grid item xs={8}>
                            <input
                                type="text"
                                name='email'
                                id='email'
                                {...register('email')}
                                placeholder='Please enter your email'
                            />
                            <Typography variant='body1'>{errors.email?.message}</Typography>
                        </Grid>
                    </Grid>

                </Grid>

                {/* password */}
                <Grid item sx={styles}>
                    <Grid sx={styles} container alignItems='center' justifyContent='space-between' spacing={1}>
                        <Grid item xs={4}>
                            <label htmlFor="password"><Typography variant='h4'>password</Typography></label>
                        </Grid>
                        <Grid item xs={8}>
                            <Box sx={{position: 'relative'}}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    id='password'
                                    placeholder='Please enter your password'
                                    {...register('password')}
                                />
                                <Box sx={{position: 'absolute', top: '50%', right: '0', transform: 'translateY(-50%)'}}>
                                    <IconButton onClick={() => setShowPassword(prev => !prev)}>
                                        {
                                            showPassword ? <VisibilityOffIcon fontSize='large' /> : <VisibilityIcon fontSize='large' />
                                        }
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography variant='body1'>{errors.password?.message}</Typography>
                        </Grid>
                    </Grid>

                </Grid>

                {/* confirm password */}
                <Grid item sx={styles}>
                    <Grid sx={styles} container alignItems='center' justifyContent='space-between' spacing={1}>
                        <Grid item xs={4}>
                            <label htmlFor="confirmPassword"><Typography variant='h4'>Confirmation</Typography></label>
                        </Grid>
                        <Grid item xs={8}>
                            <Box sx={{position: 'relative'}}>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name='confirmPassword'
                                    id='confirmPassword'
                                    placeholder='Please confirm your password'
                                    {...register('confirmPassword')}
                                />
                                <Box sx={{position: 'absolute', top: '50%', right: '0', transform: 'translateY(-50%)'}}>
                                    <IconButton onClick={() => setShowConfirmPassword(prev => !prev)}>
                                        {
                                            showConfirmPassword ? <VisibilityOffIcon fontSize='large' /> : <VisibilityIcon fontSize='large' />
                                        }
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography variant='body1'>{errors.confirmPassword && 'The password is not the same.'}</Typography>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid item  sx={styles}>
                    <Button className='loginBtn' disableElevation onClick={handleSubmit(registerUser)} variant="contained">
                        <Typography variant='h6'>REGISTER</Typography>
                    </Button>
                </Grid>

                <Grid item sx={styles}>
                    <Grid container alignItems='center' justifyContent='center' spacing={1}>
                        <Grid item>
                            <Typography variant='h5'>
                                Already have an account?
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Link to='/login'>
                                <Typography variant='body2'>Login</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Container>
    )
}

export default RegisterForm
