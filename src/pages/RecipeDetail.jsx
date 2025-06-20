import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Chip
} from '@mui/material';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.error(err);
        navigate('/recipes');
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      navigate('/recipes');
    } catch (err) {
      console.error(err);
    }
  };

  if (!recipe) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h3" gutterBottom>
            {recipe.dishName}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Chip label={`Prep Time: ${recipe.preparationTime}`} />
            <Chip label={`Author: ${recipe.author.username}`} />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" gutterBottom>
            Ingredients
          </Typography>
          <List>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemText primary={ingredient} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" gutterBottom>
            Steps
          </Typography>
          <List>
            {recipe.steps.map((step, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${step}`} />
              </ListItem>
            ))}
          </List>
          {user && user.id === recipe.author._id && (
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                component={Link}
                to={`/edit-recipe/${recipe._id}`}
              >
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RecipeDetail;