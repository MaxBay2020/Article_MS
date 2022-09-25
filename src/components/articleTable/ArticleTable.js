import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import IconButton from "@mui/material/IconButton";
import {Button, Grid} from "@mui/material";
import {useState} from "react";
import ArticleForm from "../form/articleForm/ArticleForm";
import moment from "moment";
import {useDispatch} from "react-redux";
import {setCurrentArticle} from "../../features/activeArticleSlice/activeArticleSlice";
import {useDeleteArticleById} from "../../hooks/useMutateArticle";
import DeleteDialog from "../deleteDialog/DeleteDialog";

const ArticleTable = ({page, articles}) => {

    const [showArticleForm, setShowArticleForm] = useState(false)
    const [addOrUpdate, setAddOrUpdate] = useState('add');
    const { mutate: deleteArticleById } = useDeleteArticleById(page)

    const [open, setOpen] = useState(false)
    const [articleIdClicked, setArticleIdClicked] = useState(null);

    const dispatch = useDispatch()

    const handleEdit = (article) => {
        dispatch(setCurrentArticle(article))
        setShowArticleForm(true)
    }

    const handleEditArticle = (article) => {
        handleEdit(article)
        setAddOrUpdate('update')
    }

    const handleDeleteArticleById = id => {
        deleteArticleById(id)
    }

    const handleOpenDeleteDialog = id => {
        setOpen(true)
        setArticleIdClicked(id)
    }

    return (
        <>
            <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item><Typography variant='h2'>Articles</Typography></Grid>
                <Grid item>
                    <Button variant="outlined" size='large' onClick={()=>setShowArticleForm(true)}>
                        <Typography variant='h5'>Add New</Typography>
                    </Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{margin: '20px 0'}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant='h4'>Title</Typography></TableCell>
                            <TableCell align="right"><Typography variant='h4'>Author</Typography></TableCell>
                            <TableCell align="right"><Typography variant='h4'>Created At</Typography></TableCell>
                            <TableCell align="right"><Typography variant='h4'>Actions</Typography></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {articles && articles.map((article) => (
                            <TableRow
                                key={article.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography variant='h5'>{article.title}</Typography>
                                </TableCell>
                                <TableCell align="right"><Typography variant='h5'>{article.author}</Typography></TableCell>
                                <TableCell align="right"><Typography variant='h5'>{moment(article.published).format('YYYY-MM-DD')}</Typography></TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={()=>handleEditArticle(article)}
                                    >
                                        <EditOutlinedIcon color='success' fontSize='large' />
                                    </IconButton>

                                    <IconButton
                                        onClick={() => handleOpenDeleteDialog(article.id)}
                                    >
                                        <DeleteForeverOutlinedIcon color='error' fontSize='large' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            {
                showArticleForm &&
                <ArticleForm
                    page={page}
                    setShowArticleForm={setShowArticleForm}
                    addOrUpdate={addOrUpdate}
                    setAddOrUpdate={setAddOrUpdate}
                />
            }

            {
                <DeleteDialog
                    open={open}
                    setOpen={setOpen}
                    handleDeleteArticleById={handleDeleteArticleById}
                    articleIdClicked={articleIdClicked}
                />
            }
        </>
    );
}

export default ArticleTable
