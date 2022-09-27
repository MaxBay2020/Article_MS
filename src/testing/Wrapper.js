import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/userSlice/userSlice";
import activeArticleReducer from "../features/activeArticleSlice/activeArticleSlice";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom'

const queryClient = new QueryClient()
const store = configureStore({
    reducer:{
        user: userReducer,
        currentArticle: activeArticleReducer,
    }
})

const Wrapper = ({children}) => (
    <Router>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Provider>
    </Router>

)

export default Wrapper
