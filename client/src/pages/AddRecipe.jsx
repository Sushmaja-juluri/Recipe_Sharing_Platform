import { useState } from "react";
import "./AddRecipe.css";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleFileChange = (e) => {
    setRecipe({ ...recipe, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Recipe:", recipe);
    alert("Recipe Added Successfully!");
    setRecipe({
      name: "",
      ingredients: "",
      price: "",
      image: null,
    });
  };

  return (
    <div className="add-recipe-container">
      <h2 className="title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">Recipe Name</label>
        <input
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          className="input"
          required
        />

        <label className="label">Ingredients</label>
        <textarea
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          className="textarea"
          required
        />

        <label className="label">Price (₹)</label>
        <input
          type="number"
          name="price"
          value={recipe.price}
          onChange={handleChange}
          className="input"
          required
        />

        <label className="label">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="input"
          required
        />

        <button type="submit" className="button">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
