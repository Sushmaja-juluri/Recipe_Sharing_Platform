import RecipeList from "../components/RecipeList";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Recipe Maker</h1>
      <p className="home-subtitle">
        Explore delicious recipes and share your own!
      </p>
      <RecipeList />
    </div>
  );
};

export default Home;
