import './RecipeList.css';
import RecipeCard from '../components/RecipeCard';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [dishName, setDishName] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('create');
    const [currentRecipe, setCurrentRecipe] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/recipes')
            .then(res => {
                if (res?.data?.recipes) {
                    const formatted = res.data.recipes.map(r => ({
                        id: r._id,
                        dishName: r.dishName,
                        prepTime: r.prepTime,
                        ingredients: r.ingredients,
                        steps: r.steps
                    }));
                    setRecipes(formatted);
                }
            })
            .catch(error => console.error('Failed to load recipes', error.message));
    }, []);

    const handleEdit = (recipe) => {
        setModalType('edit');
        setCurrentRecipe(recipe);
        setDishName(recipe.dishName);
        setPrepTime(recipe.prepTime);
        setIngredients(recipe.ingredients);
        setSteps(recipe.steps);
        setShowModal(true);
    };

    const handleDelete = (recipe) => {
        setRecipes(prev => prev.filter(r => r.id !== recipe.id));
        // Optional: Add axios.delete call here
    };

    const handleCreate = () => {
        setModalType('create');
        setCurrentRecipe(null);
        setDishName('');
        setPrepTime('');
        setIngredients('');
        setSteps('');
        setShowModal(true);
    };

    const handleSubmit = () => {
        if (!dishName.trim() || !prepTime.trim()) return;

        const newRecipe = {
            id: modalType === 'edit' ? currentRecipe.id : Date.now(),
            dishName,
            prepTime,
            ingredients,
            steps
        };

        if (modalType === 'edit') {
            setRecipes(prev => prev.map(r => r.id === currentRecipe.id ? newRecipe : r));
        } else {
            setRecipes(prev => [...prev, newRecipe]);
        }

        setShowModal(false);
        setDishName('');
        setPrepTime('');
        setIngredients('');
        setSteps('');
        setCurrentRecipe(null);
    };

    return (
        <div className="ancestorContainer">
            <div className="header">
                <h2>My Recipes</h2>
                <button onClick={handleCreate} className="createRecipeButton">Create Recipe</button>
            </div>

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
                <div className="noRecipes">No Recipes to display</div>
            )}

            {showModal && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <h2>{modalType === 'edit' ? 'Edit Recipe' : 'Create Recipe'}</h2>
                        <input
                            type="text"
                            placeholder="Dish Name"
                            value={dishName}
                            onChange={(e) => setDishName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Preparation Time (mins)"
                            value={prepTime}
                            onChange={(e) => setPrepTime(e.target.value)}
                        />
                        <textarea
                            placeholder="Ingredients (comma-separated)"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                        <textarea
                            placeholder="Steps"
                            value={steps}
                            onChange={(e) => setSteps(e.target.value)}
                        />
                        <div className="modalButtons">
                            <button onClick={handleSubmit} className="modalButton">Submit</button>
                            <button onClick={() => setShowModal(false)} className="modalButton">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
