import LoginForm from "../../components/form/loginForm/LoginForm";
import {useLocation} from 'react-router-dom'
import RegisterForm from "../../components/form/registerForm/RegisterForm";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@emotion/react";


const theme = createTheme({
    typography: {
        h3: {
            color: '#323232',

        },
        h4: {
            fontSize: '18px',
            fontWeight: '300',
            textAlign: 'right',
            textTransform: 'capitalize',
        },
        h5: {
            fontSize: '16px',
            color: 'rgb(45,45,45)',
        },
        body1: {
            fontSize: '14px',
            color: 'rgb(222,22,22)',
            textTransform: 'capitalize',
        },
        body2: {
            fontSize: '16px',
            color: 'rgb(27,64,116)',
            borderBottom: '1px solid rgb(37,80,141)'
        }
    },
    palette: {
        primary: {
            main: 'rgb(37,80,141)'
        }
    }
})


const AuthPage = () => {
    const {pathname} = useLocation()

    const renderUI = () => {
        switch (pathname.toLowerCase()){
            case '/login':
                return <LoginForm />
            case '/register':
                return <RegisterForm />
            default:
                break
        }
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                {renderUI()}
            </ThemeProvider>
        </>
    )
}

export default AuthPage
