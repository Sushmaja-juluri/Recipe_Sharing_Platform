import './RecipeList.css'

export default function RecipeList() {
    return (
        <>
            <div id="ancestorContainer" className="ancestorContainer">
                <div id="header" className="header">Recipes</div>

                <div id="recipeCard" className="recipeCard">
                    <div id="recipeInfoContainer" className="recipeInfoContainer">
                        <span id="recipeName" className="recipeName">Paneer Butter Masala</span>
                        <span id="prepTime" className="prepTime">Prep Time: 30 mins</span>
                    </div>

                    <div id="ingredients" className="ingredients">
                        <strong>Ingredients:</strong>
                        <ul>
                            <li>Paneer</li>
                            <li>Butter</li>
                            <li>Tomatoes</li>
                            <li>Cream</li>
                            <li>Spices</li>
                        </ul>
                    </div>

                    <div id="steps" className="steps">
                        <strong>Steps:</strong>
                        <ol>
                            <li>Heat butter in a pan.</li>
                            <li>Add tomato puree and cook.</li>
                            <li>Add cream and spices.</li>
                            <li>Add paneer and simmer.</li>
                        </ol>
                    </div>

                    <div id="cardActions" className="cardActions">
                        <button id="editButton" className="actionButton">Edit</button>
                        <button id="deleteButton" className="actionButton deleteButton">Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}
