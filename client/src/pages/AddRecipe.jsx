import { useState } from "react";
import axios from "axios";
import "./AddRecipe.css";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    prepTime: "",
    ingredients: "",
    steps: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleFileChange = (e) => {
    setRecipe({ ...recipe, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("prepTime", recipe.prepTime);
    formData.append("ingredients", recipe.ingredients);
    formData.append("steps", recipe.steps);
    if (recipe.image) {
      formData.append("image", recipe.image);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Recipe Added Successfully!");
      console.log("Saved Recipe:", res.data);

      setRecipe({
        name: "",
        prepTime: "",
        ingredients: "",
        steps: "",
        image: null,
      });
    } catch (err) {
      console.error("Error adding recipe:", err);
      alert("Failed to add recipe.");
    }
  };

  return (
    <div className="add-recipe-container">
    <h2 className="title">Add a New Recipe</h2>
    <form onSubmit={handleSubmit} className="form">
    <label className="label">Dish Name</label>
    <input
    type="text"
    name="name"
    value={recipe.name}
    onChange={handleChange}
    className="input"
    required
    />

    <label className="label">Preparation Time</label>
    <input
    type="text"
    name="prepTime"
    value={recipe.prepTime}
    onChange={handleChange}
    className="input"
    placeholder="e.g., 30 minutes"
    required
    />

    <label className="label">Ingredients (comma separated)</label>
    <textarea
    name="ingredients"
    value={recipe.ingredients}
    onChange={handleChange}
    className="textarea"
    required
    />

    <label className="label">Steps (one per line)</label>
    <textarea
    name="steps"
    value={recipe.steps}
    onChange={handleChange}
    className="textarea"
    required
    />

    <label className="label">Upload Image</label>
    <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="input"
    />

    <button type="submit" className="button">
    Add Recipe
    </button>
    </form>
    </div>
  );
};

export default AddRecipe;
