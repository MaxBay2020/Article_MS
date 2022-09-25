
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import axios from "../utils/axios";

const addArticle = async (article) => {
    const res = await axios.post('/articles', article)
    await axios.post('/totalArticles', {
        isbn: article.isbn
    })
    if(res.status === 200)
        return res.data
}

const updateArticleById = async (updateArticle) => {
    const res = await axios.put(`/articles/${updateArticle.id}`, updateArticle)
    if(res.status === 200)
        return res.data
}

const deleteArticleById = async (id) => {
    const res = await axios.delete(`/articles/${id}`)
    await axios.delete(`/totalArticles/${id}`)
    if(res.status === 200)
        return res.data
}

// add new article
export const useAddArticle = (page) => {
    const queryClient = useQueryClient()

    return useMutation(addArticle, {

        onMutate: async (newArticle) => {
            await queryClient.cancelQueries(['getArticlesByPage', page])
            await queryClient.cancelQueries(['getTotalPages'])

            const previousArticles = queryClient.getQueryData(['getArticlesByPage', page])
            const previousPages = queryClient.getQueryData(['getTotalPages'])

            queryClient.setQueryData(['getArticlesByPage', page], (oldArticles) => {
                oldArticles.push({
                    id: oldArticles?.length + 1,
                    ...newArticle
                })
            })

            queryClient.setQueryData(['getTotalPages'], (oldTotalPages) => {
                oldTotalPages.push({
                    isbn: newArticle.isbn
                })
            })


            return {
                previousArticles,
                previousPages
            }
        },

        onError: (error, newArticle, context) => {
            queryClient.setQueryData(['getArticlesByPage', page], () => {
                return context.previousArticles
            })

            queryClient.setQueryData(['getTotalPages'], () => {
                return context.previousPages
            })
        },

        onSettled: () => {
            queryClient.invalidateQueries(['getArticlesByPage', page])
            queryClient.invalidateQueries(['getTotalPages'])
        }
    })
}

// update article by id
export const useUpdateArticleById = (page) => {
    const queryClient = useQueryClient()

    return useMutation(updateArticleById, {
        onMutate: async (updateArticle) => {

            await queryClient.cancelQueries(['getArticlesByPage', page])
            const previousArticles = queryClient.getQueryData(['getArticlesByPage', page])
            queryClient.setQueryData(['getArticlesByPage', page], (oldArticles) => {
                let index = oldArticles.findIndex(article => article.id === updateArticle.id)
                oldArticles[index] = updateArticle
                return oldArticles
            })

            return {
                previousArticles
            }
        },
        onError: (error, updateArticle, context) => {
            queryClient.setQueryData(['getArticlesByPage', page], () => {
                return context.previousArticles
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries(['getArticlesByPage', page])

        }
    })
}


export const useDeleteArticleById = (page) => {
    const queryClient = useQueryClient()
    return useMutation(deleteArticleById, {
        onMutate: async (id) => {

            await queryClient.cancelQueries(['getArticlesByPage', page])
            await queryClient.cancelQueries(['getTotalPages'])

            const previousArticles = queryClient.getQueryData(['getArticlesByPage', page])
            const previousPages = queryClient.getQueryData(['getTotalPages'])

            queryClient.setQueryData(['getArticlesByPage', page], (oldArticles) => {
                return oldArticles.filter(article => article.id !== id)
            })

            queryClient.setQueryData(['getTotalPages'], (oldTotalPages) => {
                return oldTotalPages.filter(item => item.id === id)
            })


            return {
                previousArticles,
                previousPages
            }
        },

        onError: (error, newArticle, context) => {
            queryClient.setQueryData(['getArticlesByPage', page], () => {
                return context.previousArticles
            })

            queryClient.setQueryData(['getTotalPages'], () => {
                return context.previousPages
            })
        },

        onSettled: () => {
            queryClient.invalidateQueries(['getArticlesByPage', page])
            queryClient.invalidateQueries(['getTotalPages'])
        }
    })
}

