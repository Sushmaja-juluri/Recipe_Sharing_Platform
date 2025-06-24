import './RecipeCard.css';

export default function RecipeCard({ recipe, onEdit, onDelete }) {
    return (
        <div className="recipeCard">
            <div className="recipeDetails">
                <h3 className="recipeTitle">{recipe.dishName}</h3>
                <p className="prepTime">Prep Time: {recipe.prepTime} mins</p>
                <p className="ingredients"><strong>Ingredients:</strong> {recipe.ingredients}</p>
                <p className="steps"><strong>Steps:</strong> {recipe.steps}</p>
            </div>
            <div className="recipeActions">
                <button className="actionButton" onClick={() => onEdit(recipe)}>Edit</button>
                <button className="actionButton deleteButton" onClick={() => onDelete(recipe)}>Delete</button>
            </div>
        </div>
    );
}
