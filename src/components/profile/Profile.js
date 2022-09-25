import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useState} from "react";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";
import {logout} from "../../features/userSlice/userSlice";


const ProfileButton = styled(Box)(({theme}) =>({
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    border: '1px solid #fff',
    backgroundColor: '#4463aa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}))

const Profile = ({email}) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const dispatch = useDispatch()

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        setAnchorEl(null)
        dispatch(logout())
    };

    return (
        <>
            <div>
                <IconButton
                    size="small"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <ProfileButton>
                        <Typography sx={{color: '#fff'}} variant='h6'>{email.substring(0, 2)}</Typography>
                    </ProfileButton>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={()=>setAnchorEl(null)}
                >
                    <MenuItem onClick={handleLogout}>
                        <Typography variant='h6'>Log out</Typography>
                    </MenuItem>
                </Menu>
            </div>
        </>
    )
}

export default Profile
