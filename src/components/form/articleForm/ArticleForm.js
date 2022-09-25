import {Button, Container, createTheme, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {ThemeProvider} from "@emotion/react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import IconButton from "@mui/material/IconButton";
import {useForm} from "react-hook-form";
import articleSchema from "../../../schema/articleSchema";
import {yupResolver} from "@hookform/resolvers/yup";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {resetCurrentArticle} from "../../../features/activeArticleSlice/activeArticleSlice";
import {useState} from "react";
import {useAddArticle, useUpdateArticleById} from "../../../hooks/useMutateArticle";


// {
//     "isbn": "9781484200766",
//     "title": "Pro Git",
//     "subtitle": "Everything you neeed to know about Git",
//     "author": "Scott Chacon and Ben Straub",
//     "published": "2014-11-18T00:00:00.000Z",
//     "publisher": "Apress; 2nd edition",
//     "pages": 458,
//     "description": "Pro Git (Second Edition) is your fully-updated guide to Git and its usage in the modern world. Git has come a long way since it was first developed by Linus Torvalds for Linux kernel development. It has taken the open source world by storm since its inception in 2005, and this book teaches you how to use it like a pro.",
//     "website": "https://git-scm.com/book/en/v2"
// }

const styles = {
    width: '100%'
}

const theme = createTheme({
    typography: {
        h3: {
            color: '#323232',

        },
        h4: {
            fontSize: '22px',
            fontWeight: '500',
            textTransform: 'uppercase',
            color: '#1c1c1c',
        },
        h5: {
            fontSize: '16px',
            color: 'rgb(56,56,56)',
            textTransform: 'capitalize',
            textAlign: 'right',

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

const ArticleForm = ({page, setShowArticleForm, addOrUpdate, setAddOrUpdate}) => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(articleSchema)
    })

    const currentArticle = useSelector(state => state.currentArticle)
    const [article, setArticle] = useState(currentArticle);
    const dispatch = useDispatch()

    const { mutate: addArticle } = useAddArticle(page)
    const { mutate: updateArticleById} = useUpdateArticleById(page)


    const handleUpdateArticle = e => {
        const {name, value} = e.target
        setArticle({
            ...article,
            [name]: value
        })
    }

    const mutateArticle = data => {

        if(addOrUpdate === 'add'){
            // add new article
            if(!article.published)
                data.published = moment(Date.now()).format('YYYY-MM-DD')
            const updatedArticle = {
                ...article,
                ...data
            }
            addArticle(updatedArticle)
            setShowArticleForm(false)
        }else{
            // update article
            updateArticleById(article)
        }
    }

    const handleCloseForm = () => {
        setShowArticleForm(false)
        dispatch(resetCurrentArticle())
    }

    const handleAddArticle = (data) => {
        mutateArticle(data)
        setAddOrUpdate('add')
    }

    return (
        <ThemeProvider theme={theme}>
            <Box className='grayBg' onClick={()=>handleCloseForm()} />
            <Box className='formContainer articleFormContainer'>
                <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{position: 'relative'}}
                >
                    <Box sx={{position: 'absolute', top: '0px', right: '0px'}}>
                        <IconButton onClick={()=>handleCloseForm()}>
                            <CloseOutlinedIcon fontSize='large' />
                        </IconButton>
                    </Box>

                    {/* heading */}
                    <Grid item>
                        <Typography variant='h4'>article details</Typography>
                    </Grid>
                    {/* isbn */}
                    <Grid item sx={styles}>
                        <Grid container alignItems='center' justifyContent='space-between' spacing={1}>
                            <Grid item xs={4}>
                                <label htmlFor="isbn">
                                    <Typography sx={styles} variant='h5'>isbn</Typography>
                                </label>
                            </Grid>
                            <Grid item xs={8}>
                                <input
                                    type="text"
                                    name='isbn'
                                    id='isbn'
                                    value={article.isbn}
                                    onChange={e=>handleUpdateArticle(e)}
                                    placeholder='Please enter isbn'
                                    {...register('isbn')}
                                />
                                <Typography variant='body1'>{errors.isbn?.message}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* title */}
                    <Grid item sx={styles}>
                        <Grid container alignItems='center' justifyContent='space-between' spacing={1}>
                            <Grid item xs={4}>
                                <label htmlFor="title">
                                    <Typography sx={styles} variant='h5'>title</Typography>
                                </label>
                            </Grid>
                            <Grid item xs={8}>
                                <input
                                    type="text"
                                    name='title'
                                    id='title'
                                    placeholder='Please enter title'
                                    value={article.title}
                                    onChange={e=>handleUpdateArticle(e)}
                                    {...register('title')}
                                />
                                <Typography variant='body1'>{errors.title?.message}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* subtitle */}
                    <Grid item sx={styles}>
                        <Grid container alignItems='center' justifyContent='space-between' spacing={1}>
                            <Grid item xs={4}>
                                <label htmlFor="subtitle">
                                    <Typography sx={styles} variant='h5'>subtitle</Typography>
                                </label>
                            </Grid>
                            <Grid item xs={8}>
                                <input
                                    type="text"
                                    name='subtitle'
                                    id='subtitle'
                                    placeholder='Please enter subtitle'
                                    value={article.subtitle || ''}
                                    onChange={e=>handleUpdateArticle(e)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* author */}
                    <Grid item sx={styles}>
                        <Grid container alignItems='center' justifyContent='space-between' spacing={1}>
                            <Grid item xs={4}>
                                <label htmlFor="author">
                                    <Typography sx={styles} variant='h5'>author</Typography>
                                </label>
                            </Grid>
                            <Grid item xs={8}>
                                <input
                                    type="text"
                                    name='author'
                                    id='author'
                                    placeholder='Please enter author'
                                    value={article.author || ''}
                                    onChange={e=>handleUpdateArticle(e)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* publisher */}
                    <Grid item sx={styles}>
                        <Grid container alignItems='center' justifyContent='space-between' spacing={1}>
                            <Grid item xs={4}>
                                <label htmlFor="publisher">
                                    <Typography sx={styles} variant='h5'>publisher</Typography>
                                </label>
                            </Grid>
                            <Grid item xs={8}>
                                <input
                                    type="text"
                                    name='publisher'
                                    id='publisher'
                                    placeholder='Please enter publisher'
                                    value={article.publisher || ''}
                                    onChange={e=>handleUpdateArticle(e)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* pages */}
                    <Grid item sx={styles}>
                        <Grid container alignItems='center' justifyContent='space-between' spacing={1}>
                            <Grid item xs={4}>
                                <label htmlFor="pages">
                                    <Typography sx={styles} variant='h5'>pages</Typography>
                                </label>
                            </Grid>
                            <Grid item xs={8}>
                                <input
                                    type="number"
                                    name='pages'
                                    id='pages'
                                    placeholder='Please enter pages'
                                    value={article.pages || ''}
                                    onChange={e=>handleUpdateArticle(e)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* desc */}
                    <Grid item sx={styles}>
                        <Grid container alignItems='center' justifyContent='space-between' spacing={1}>
                            <Grid item xs={4}>
                                <label htmlFor="description">
                                    <Typography sx={styles} variant='h5'>description</Typography>
                                </label>
                            </Grid>
                            <Grid item xs={8}>
                                <textarea
                                    name='description'
                                    id='description'
                                    placeholder='Please enter description'
                                    value={article.description || ''}
                                    onChange={e=>handleUpdateArticle(e)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* website */}
                    <Grid item sx={styles}>
                        <Grid container alignItems='center' justifyContent='space-between' spacing={1}>
                            <Grid item xs={4}>
                                <label htmlFor="website">
                                    <Typography sx={styles} variant='h5'>website</Typography>
                                </label>
                            </Grid>
                            <Grid item xs={8}>
                                <input
                                    type="text"
                                    name='website'
                                    id='website'
                                    placeholder='Please enter website'
                                    value={article.website || ''}
                                    onChange={e=>handleUpdateArticle(e)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* create button */}
                    <Grid item sx={styles}>
                        <Grid sx={styles} container justifyContent='flex-end'>
                            <Grid item xs={2}>
                                <Button onClick={handleSubmit(handleAddArticle)} disableElevation variant='contained' className='createBtn'>
                                    <Typography variant='h6'>Confirm</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

        </ThemeProvider>
    )
}

export default ArticleForm
