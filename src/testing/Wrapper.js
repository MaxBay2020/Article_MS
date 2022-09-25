import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/userSlice/userSlice";
import activeArticleReducer from "../features/activeArticleSlice/activeArticleSlice";
import {Provider} from "react-redux";

const queryClient = new QueryClient()
const store = configureStore({
    reducer:{
        user: userReducer,
        currentArticle: activeArticleReducer,
    }
})

const Wrapper = ({children}) => (
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </Provider>

)

export default Wrapper
