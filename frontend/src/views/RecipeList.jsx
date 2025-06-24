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
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
  if (!token) {
    window.location.href = '/login'; // Or use navigate('/login') if using React Router
   }
   }, []);

  useEffect(() => {
    if (!token) {
      console.error('User is not authenticated');
      return;
    }


    axios
      .get('http://localhost:3000/tomakes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.recipes) {
          const formatted = res.data.recipes.map((r) => ({
            id: r._id,
            dishName: r.dishName,
            prepTime: r.prepTime,
            ingredients: r.ingredients,
            steps: r.steps,
          }));
          setRecipes(formatted);
        }
      })
      .catch((error) => {
        console.error('Failed to load recipes:', error.message);
      });
  }, [token]);

  const handleEdit = (recipe) => {
    setModalType('edit');
    setCurrentRecipe(recipe);
    setDishName(recipe.dishName);
    setPrepTime(recipe.prepTime);
    setIngredients(recipe.ingredients);
    setSteps(recipe.steps);
    setShowModal(true);
    setError('');
  };

  const handleDelete = (recipe) => {
    if (!token) return alert('Please log in first.');

    axios
      .delete(`http://localhost:3000/tomakes/${recipe.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setRecipes((prev) => prev.filter((r) => r.id !== recipe.id));
      })
      .catch((err) => {
        console.error('Failed to delete recipe:', err.message);
        alert('Error deleting recipe');
      });
  };

  const handleCreate = () => {
    setModalType('create');
    setCurrentRecipe(null);
    resetForm();
    setShowModal(true);
    setError('');
  };

  const resetForm = () => {
    setDishName('');
    setPrepTime('');
    setIngredients('');
    setSteps('');
    setCurrentRecipe(null);
  };

  const handleSubmit = () => {
    if (!token) return alert('You must be logged in to submit a recipe.');

    if (!dishName.trim() || !prepTime.trim()) {
      setError('Dish name and preparation time are required.');
      return;
    }

    const payload = {
      dishName: dishName.trim(),
      prepTime: prepTime.trim(),
      ingredients: ingredients.trim(),
      steps: steps.trim(),
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const endpoint =
      modalType === 'edit'
        ? `http://localhost:3000/tomakes/${currentRecipe.id}`
        : 'http://localhost:3000/tomakes';

    const method = modalType === 'edit' ? axios.patch : axios.post;

    method(endpoint, payload, config)
      .then((res) => {
        const newOrUpdated = modalType === 'edit' ? res.data.updatedRecipe : res.data.newRecipe;

        if (!newOrUpdated) throw new Error('No data returned');

        setRecipes((prev) => {
          if (modalType === 'edit') {
            return prev.map((r) =>
              r.id === newOrUpdated._id
                ? {
                    id: newOrUpdated._id,
                    dishName: newOrUpdated.dishName,
                    prepTime: newOrUpdated.prepTime,
                    ingredients: newOrUpdated.ingredients,
                    steps: newOrUpdated.steps,
                  }
                : r
            );
          } else {
            return [
              ...prev,
              {
                id: newOrUpdated._id,
                dishName: newOrUpdated.dishName,
                prepTime: newOrUpdated.prepTime,
                ingredients: newOrUpdated.ingredients,
                steps: newOrUpdated.steps,
              },
            ];
          }
        });

        resetForm();
        setShowModal(false);
      })
      .catch((err) => {
        console.error('Error submitting recipe:', err.message);
        setError('Failed to submit recipe. Please try again.');
      });
  };

  return (
    <div className="ancestorContainer">
      <div className="header">
        <h2>My Recipes</h2>
        <button onClick={handleCreate} className="createRecipeButton">
          Create Recipe
        </button>
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
            {error && <div className="error">{error}</div>}
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
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(false);
                  setError('');
                }}
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
