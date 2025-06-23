import './RecipeList.css';
import RecipeCard from '../components/RecipeCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [recipeName, setRecipeName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('create');
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const username = JSON.parse(localStorage.getItem('user'))?.user?.username || 'randomUser';

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/tomakes', axiosConfig);
            setRecipes(res.data?.tomakes || []);
        } catch (err) {
            setError('Failed to fetch recipes');
            if (err.response?.status === 401) handleLogout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchRecipes();
    }, []);

    const handleEdit = (recipe) => {
        setModalType('edit');
        setShowModal(true);
        setCurrentRecipe(recipe);
        setRecipeName(recipe.title);
    };

    const handleDelete = async (recipe) => {
        try {
            await axios.delete(`/tomakes/${recipe._id}`, axiosConfig);
            setRecipes(prev => prev.filter(r => r._id !== recipe._id));
        } catch (err) {
            setError('Failed to delete recipe');
            if (err.response?.status === 401) handleLogout();
        }
    };

    const handleCreate = () => {
        setModalType('create');
        setCurrentRecipe(null);
        setRecipeName('');
        setShowModal(true);
    };

    const handleSubmit = async () => {
        if (!recipeName.trim()) {
            setError('Recipe name cannot be empty');
            return;
        }

        setLoading(true);
        try {
            let res;
            if (modalType === 'edit') {
                res = await axios.patch(
                    `/tomakes/${currentRecipe._id}`,
                    { title: recipeName },
                    axiosConfig
                );
                setRecipes(prev => prev.map(r => 
                    r._id === currentRecipe._id ? res.data.updatedTomake : r
                ));
            } else {
                res = await axios.post(
                    '/tomakes',
                    { title: recipeName, completed: false },
                    axiosConfig
                );
                setRecipes(prev => [...prev, res.data.newTomake]);
            }
            setShowModal(false);
            setRecipeName('');
            setError('');
        } catch (err) {
            console.error('Submission error:', err);
            setError(err.response?.data?.error || 'Failed to submit recipe');
            if (err.response?.status === 401) handleLogout();
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login', { replace: true });
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="ancestorContainer">
            <div className="header">
                <h2>My Recipes</h2>
                <div className="button-group">
                    <button onClick={handleCreate} className="createRecipeButton">Create Recipe</button>
                    <button onClick={handleSignup} className="signupButton">Sign Up</button>
                    <button onClick={handleLogout} className="logoutButton">Logout</button>
                </div>
                <div className="user-info">Logged in user: <strong>{username}</strong></div>
            </div>

            {error && <div className="error-message">{error}</div>}
            {loading && <div className="loading-indicator">Loading...</div>}

            {recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                    <RecipeCard
                        key={index}
                        recipe={recipe}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))
            ) : (
                <div className="noRecipes">No Recipe to display</div>
            )}

            {showModal && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <h2>{modalType === 'edit' ? 'Edit Recipe' : 'Create Recipe'}</h2>
                        <input
                            type="text"
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                            placeholder="Enter recipe name"
                            disabled={loading}
                        />
                        <div className="modalButtons">
                            <button 
                                onClick={handleSubmit} 
                                disabled={loading}
                                className="modalButton"
                            >
                                {loading ? 'Processing...' : 'Submit'}
                            </button>
                            <button 
                                onClick={() => !loading && setShowModal(false)}
                                disabled={loading}
                                className="modalButton"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
