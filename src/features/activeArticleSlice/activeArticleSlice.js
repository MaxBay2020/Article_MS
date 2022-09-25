import {createSlice} from '@reduxjs/toolkit'

const initialState = {}

export const activeArticleSlice = createSlice({
    name: 'current article',
    initialState,
    reducers: {
        setCurrentArticle: (state, action) => {
            state = action.payload
            return state
        },

        resetCurrentArticle: (state) => {
            state = {}
            return state
        }
    }
})

export default activeArticleSlice.reducer
export const {
    setCurrentArticle,
    resetCurrentArticle
} = activeArticleSlice.actions
