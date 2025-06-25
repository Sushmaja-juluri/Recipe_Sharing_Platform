import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import EditRecipeModal from "../components/EditRecipeModal";
import "./RecipeList.css";

const initialRecipes = [
  {
    id: 1,
    name: "Dosa",
    prepTime: "30 minutes",
    image: "/images/dosa.jpg",
    ingredients: ["Rice", "Urad Dal", "Salt"],
    steps: ["Soak rice and dal", "Grind to batter", "Ferment overnight", "Cook on tawa"]
  },
{
  id: 2,
  name: "Vada",
  prepTime: "20 minutes",
  image: "/images/vada.jpg",
  ingredients: ["Urad Dal", "Curry Leaves", "Chilies"],
  steps: ["Soak dal", "Grind and mix spices", "Shape and deep fry"]
},
{
  id: 5,
  name: "Pasta",
  prepTime: "25 minutes",
  image: "/images/pasta.jpg",
  ingredients: ["Pasta", "Olive Oil", "Tomato Sauce"],
  steps: ["Boil pasta", "Cook sauce", "Mix and serve"]
},
{
  id: 6,
  name: "Burger",
  prepTime: "15 minutes",
  image: "/images/burger.jpg",
  ingredients: ["Bun", "Patty", "Cheese", "Lettuce", "Tomato"],
  steps: ["Grill patty", "Toast bun", "Assemble burger"]
},
{
  id: 9,
  name: "Sushi",
  prepTime: "40 minutes",
  image: "/images/sushi.jpg",
  ingredients: ["Rice", "Nori", "Fish"],
  steps: ["Cook rice", "Place on nori", "Add fish and roll"]
},
{
  id: 10,
  name: "Ramen",
  prepTime: "35 minutes",
  image: "/images/ramen.jpg",
  ingredients: ["Noodles", "Broth", "Egg", "Fish Cake"],
  steps: ["Boil broth", "Cook noodles", "Add toppings"]
}
];

const RecipeList = () => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/recipes");
        if (Array.isArray(res.data)) {
          setRecipes((prev) => [...prev, ...res.data]);
        }
      } catch (error) {
        console.error("Failed to fetch recipes from backend:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  const handleDelete = (id) => {
    setRecipes(recipes.filter((r) => (r._id || r.id) !== id));
  };

  const handleEdit = (recipe) => {
    setSelectedRecipe(recipe);
    setEditModalOpen(true);
  };

  const handleSave = (updatedRecipe) => {
    setRecipes(recipes.map((r) =>
    (r._id || r.id) === (updatedRecipe._id || updatedRecipe.id)
    ? updatedRecipe
    : r
    ));
    setEditModalOpen(false);
  };

  const filteredRecipes = recipes.filter((recipe) =>
  recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <button className="logout-btn-fixed" onClick={handleLogout}>
    Logout
    </button>

    <div className="recipe-list-container">
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h2 className="mb-0">Our Recipes</h2>
    </div>

    <div className="search-box text-center mb-4">
    <input
    type="text"
    className="form-control search-input"
    placeholder="Search recipes by name..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    />
    </div>

    <div className="row row-cols-1 row-cols-md-3 g-4">
    {filteredRecipes.length > 0 ? (
      filteredRecipes.map((recipe) => (
        <RecipeCard
        key={recipe._id || recipe.id}
        recipe={recipe}
        onEdit={handleEdit}
        onDelete={handleDelete}
        />
      ))
    ) : (
      <p className="text-center text-muted">No recipes found.</p>
    )}
    </div>

    {editModalOpen && selectedRecipe && (
      <EditRecipeModal
      recipe={selectedRecipe}
      onClose={() => setEditModalOpen(false)}
      onSave={handleSave}
      />
    )}
    </div>
    </>
  );
};

export default RecipeList;
