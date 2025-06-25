import { useState, useEffect } from "react";
import "./EditRecipeModal.css";

const EditRecipeModal = ({ recipe, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    prepTime: "",
    ingredients: "",
    steps: "",
  });

  // Populate form when modal opens
  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name || "",
        prepTime: recipe.prepTime || "",
        ingredients: recipe.ingredients.join(", "),
        steps: recipe.steps.join("\n"),
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecipe = {
      ...recipe,
      name: formData.name,
      prepTime: formData.prepTime,
      ingredients: formData.ingredients.split(",").map((item) => item.trim()),
      steps: formData.steps.split("\n").map((item) => item.trim()),
    };
    onSave(updatedRecipe);
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <h3>Edit Recipe</h3>
        <form onSubmit={handleSubmit}>
          <label>Dish Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Preparation Time</label>
          <input
            type="text"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            required
          />

          <label>Ingredients (comma-separated)</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />

          <label>Steps (each on new line)</label>
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            required
          />

          <div className="edit-modal-buttons">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipeModal;
