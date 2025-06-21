import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import RecipeList from './views/RecipeList'
function App(){
    return(
        <>
        <Router>
            <Routes>
                <Route path='/' element={<RecipeList/>}/>

            </Routes>
        </Router>
        </>
    )
    
    
}
export default App