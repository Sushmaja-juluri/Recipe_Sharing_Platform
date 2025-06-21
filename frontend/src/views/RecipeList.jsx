import './RecipeList.css'
import RecipeCard from '../components/RecipeCard'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RecipeList() {
    const [recipes, setRecipes] = useState([])
    const [recipeName, setRecipeName] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('create'); //create or edit
    const [currentRecipe, setCurrentRecipe] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/tomake')
            .then(res => {
                if (res?.data) {
                    setRecipes(res?.data?.todos)
                }
            })
            .catch(error => {
                console.error('Failed to load recipes:', error.message)
            })
    }, [])


    const handleEdit = (recipe) => {
        setModalType('edit');
        setShowModal(true);
        setCurrentRecipe(recipe);
        setRecipeName(recipe.title)
    }

    const handleDelete = async (recipe) => {
        await axios.delete(`/tomake/${recipe._id}`);
        setRecipes(prev => prev.filter(t => t._id !== recipe._id))
    }

    const handleCreate = () => {
        setModalType('create');
        setCurrentRecipe(null);
        setRecipeName('');
        setShowModal(true)
    }

    const handleSubmit = async () => {
        if (modalType === 'edit') {
            const res = await axios.patch(`/tomake/${currentRecipe._id}`, {
                title: recipeName
            })
            const updatedTomake = res.data.updatedtomake;
            setRecipes(prev => prev.map((recipe) => (
                recipe._id === updatedTomake._id ? updatedTomake : recipe
            )))
        } else if (modalType === 'create') {
            const res = await axios.post('/tomake', { title: recipeName })
            const newRecipe = res.data.newTomake
            setRecipes(prev => [...prev, newRecipe])
        }
        setShowModal(false);
        setRecipeName('');
        setCurrentRecipe(null);
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login', { replace: true });
    }
    const username = JSON.parse(localStorage.getItem('user'))?.user?.username || 'randomUser'
    return (
        <>
            <div id="ancestorContainer" className="ancestorContainer">
                <div id="header" className='header'>
                    My Tasks
                    <button onClick={handleCreate} className="createRecipeButton">Create Recipe</button>
                    <button onClick={handleLogout} className='logoutButton'>Logout</button>
                    Logged in user: {username}
                </div>
                {recipes.length > 0 ? (
                    recipes?.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} onEdit={handleEdit} onDelete={handleDelete} />
                    ))
                ) : (
                    <div id='noRecipes' className='noRecipes'> No Recipe to display</div>
                )}
                {showModal && (
                    <div id='modalOverlay' className='modalOverlay'>
                        <div id='modalContent' className='modalContent'>
                            <h2>{modalType === 'edit' ? 'Edit Recipe' : 'Create Recipe'}</h2>
                            <input
                                type="text"
                                value={recipeName}
                                onChange={(e) => setRecipeName(e.target.value)}
                                placeholder="Enter recipe name"
                            />
                            <div id="modalButtons" className='modalButtons'>
                                <button onClick={handleSubmit} id='modalButton' className='modalButton'>Submit</button>
                                <button onClick={() => setShowModal(false)} id='modalButton' className='modalButton'>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </>
    )
}