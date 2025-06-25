import "./RecipeCard.css";

const RecipeCard = ({ recipe, onEdit, onDelete }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="recipe-card card h-100">
        {recipe.image && (
          <img
            src={recipe.image}
            className="card-img-top recipe-image"
            alt={recipe.name}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{recipe.name}</h5>
          <p className="card-text"><strong>Prep Time:</strong> {recipe.prepTime}</p>
          <p className="card-text"><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
          <p className="card-text"><strong>Steps:</strong></p>
          <ul className="steps-list">
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>

          {/* Buttons for edit & delete */}
          <div className="button-row">
            <button
              className="btn btn-sm btn-warning"
              onClick={() => onEdit(recipe)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(recipe.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
