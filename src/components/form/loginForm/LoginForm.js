import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {loginSchema} from "../../../schema/authSchema";
import {Button, Container, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import '../authForm.scss'
import Logo from "../../logo/Logo";
import {Link, useNavigate} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../utils/axios";
import bcrypt from 'bcryptjs'
import {login} from "../../../features/userSlice/userSlice";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const styles = {
    width: '100%'
}

const LoginForm = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(loginSchema)
    })

    const [showPassword, setShowPassword] = useState(false);

    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const notify = (message) => (toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }))

    useEffect(() => {
        user.email && navigate('/')
    }, [user]);

    const findUserByEmail = async email => {
        const res = await axios.get(`/users?email=${email}`)
        if(res.status === 200)
            return res.data
    }

    const loginUser = async user => {
        const theUser = await findUserByEmail(user.email)
        if(theUser.length === 0){
            notify('No such user!')
            return
        }
        // check password
        if(bcrypt.compareSync(user.password, theUser[0].password)){
            // if the password is correct
            dispatch(login(user))
        }else{
            // if the password is NOT correct
            notify('Email or password not correct!')
        }
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
                <Grid item><Typography variant='h3'>Login</Typography></Grid>

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
                                    type={showPassword ? 'tet' : 'password'}
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

                <Grid item  sx={styles}>
                    <Button className='loginBtn' disableElevation onClick={handleSubmit(loginUser)} variant="contained">
                        <Typography variant='h6'>LOG IN</Typography>
                    </Button>
                </Grid>

                <Grid item sx={styles}>
                    <Grid container alignItems='center' justifyContent='center' spacing={1}>
                        <Grid item>
                            <Typography variant='h5'>
                                Don't have an account?
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Link to='/register'>
                                <Typography variant='body2'>Register</Typography>
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

export default LoginForm
