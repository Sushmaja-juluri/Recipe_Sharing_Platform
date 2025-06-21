import './RecipeCard.css'

export default function RecipeCard(props) {

    return (
        <div key={props.recipe.key} id="recipeCard" className='recipeCard'>
            <div id='recipeNameContainer' className='recipeNameContainer'>
                <span id='checkBox'>
                    <input type='checkbox' checked={props.recipe.completed} />
                </span>
                <span id='recipeName'>{props.recipe.title}</span>
            </div>
            <div id="cardActions" className='cardActions'>
                <button id='editButton' onClick={() => props.onEdit(props.recipe)} className='actionButton'>Edit</button>
                <button id='deleteButton' onClick={() => props.onDelete(props.recipe)} className='actionButton deleteButton'>Delete</button>
            </div>
        </div>
    )
}