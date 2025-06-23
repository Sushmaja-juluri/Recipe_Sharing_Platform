import './RecipeCard.css'
export default function RecipeCard({ recipe, onEdit, onDelete }) {
    return (
        <div className="recipeCard">
            <span>{recipe.title}</span>
            <div className="button-group">
                <button className="editButton" onClick={() => onEdit(recipe)}>Edit</button>
                <button className="deleteButton" onClick={() => onDelete(recipe)}>Delete</button>
            </div>
        </div>
    );
}
