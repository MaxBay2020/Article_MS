import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {useState} from "react";

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(210,29,29)'
        }
    },
    typography: {
        h4: {
            fontSize: '22px',
            color: 'rgb(210,29,29)'
        },

        h5: {
            fontSize: '18px',
            fontWeight: '300',
        },

        h6: {
            display: 'inline-block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#000'
        },

        body1: {
            fontSize: '14px'
        }
    }
})

const styles = {
    fontSize: '12px'
}

const DeleteDialog = ({open, setOpen, handleDeleteArticleById, articleIdClicked}) => {

    const user = useSelector(state => state.user)
    const [inputValue, setInputValue] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDeleteArticle = () => {
        if(inputValue === user.email){
            handleDeleteArticleById(articleIdClicked)
        }
        setOpen(false)
        setInputValue('')
    }

    return (
        <ThemeProvider theme={theme}>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle><Typography component='span' variant='h4'>WARNNING!</Typography></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography component='span' variant='h5'>
                            You are going to <Typography component='span' variant='h6'>DELETE</Typography> this article. If you would like to do so,
                            please enter <Typography component='span' variant='h6'>{user?.email}</Typography> below
                        </Typography>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Your email"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={e => setInputValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={styles} variant='contained' onClick={handleClose} >Cancel</Button>
                    <Button sx={styles} onClick={handleConfirmDeleteArticle} >Delete</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}

export default DeleteDialog
