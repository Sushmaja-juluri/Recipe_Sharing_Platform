import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RecipeList from './views/RecipeList'
import Login from './views/Login'
import axios from 'axios'
import Signup from './views/Signup'
import PrivateRoute from './components/PrivateRoute'

function App() {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/'
                        element={
                            <PrivateRoute>
                                <RecipeList />
                            </PrivateRoute>
                        }
                    />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
