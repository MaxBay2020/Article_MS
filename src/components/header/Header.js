import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {createTheme, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {ThemeProvider} from "@emotion/react";
import Profile from "../profile/Profile";
import {useState} from "react";
import Logo from "../logo/Logo";
import {useSelector} from "react-redux";

const theme = createTheme({
    palette: {
        primary: {
            main: '#fff',
        }
    },
    typography: {
        h5: {
            fontSize: '20px',
            color: '#2f2f2f',
            fontWeight: 500,
            '&::after': {
                content: '""',
                width: '0',
                height: '100%',
                display: 'block',
                transition: 'all 0.3s ease-in-out',
                borderBottom: '2px solid #1d61c7',
            },
            '&:hover::after': {
                borderBottom: '2px solid #1d61c7',
                width: '100%'
            }
        }
    }
})

const Header = () =>  {

    const [auth, setAuth] = useState(false)
    const user = useSelector(state => state.user)


    const renderLoginMenu = () => (
        <Link to='/login'>
            <Typography variant='h5'>Login</Typography>
        </Link>
    )

    const renderProfileMenu = () => <Profile email={user.email} />

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, marginBottom: '150px' }}>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container alignItems='center' justifyContent='space-between'>
                            <Grid item>
                                <Link to='/'>
                                    <Logo width={'150px'} />
                                </Link>
                            </Grid>
                            <Grid item>
                                {
                                    user.email ? renderProfileMenu() : renderLoginMenu(0)
                                }

                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
        </ThemeProvider>
    );
}
export default  Header
