import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/userSlice/userSlice'
import activeArticleReducer from '../features/activeArticleSlice/activeArticleSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        currentArticle: activeArticleReducer,
    }
})

export default store
