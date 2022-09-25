import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Header from "./components/header/Header";
import ArticlePage from "./pages/articlePage/ArticlePage";
import AuthPage from "./pages/authPage/AuthPage";
import {useSelector} from "react-redux";

const App = () => {
    const user = useSelector(state => state.user)

    return (
      <Router>
          <Header />
          <Routes>
              <Route path='/' element={user.email ? <ArticlePage /> : <Navigate to='login' />} />
              <Route path='login/' element={<AuthPage />} />
              <Route path='register/' element={<AuthPage />} />
          </Routes>
      </Router>
    )
}

export default App;
