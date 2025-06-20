import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import {
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

const RecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    dishName: '',
    preparationTime: '',
    ingredients: [''],
    steps: ['']
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchRecipe = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
          if (res.data.author._id !== user?.id) {
            navigate('/recipes');
          }
          setFormData({
            dishName: res.data.dishName,
            preparationTime: res.data.preparationTime,
            ingredients: res.data.ingredients,
            steps: res.data.steps
          });
        } catch (err) {
          console.error(err);
          navigate('/recipes');
        }
      };
      fetchRecipe();
    }
  }, [id, navigate, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, '']
    });
  };

  const removeIngredient = (index) => {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, '']
    });
  };

  const removeStep = (index) => {
    const newSteps = [...formData.steps];
    newSteps.splice(index, 1);
    setFormData({ ...formData, steps: newSteps });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/recipes/${id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/recipes', formData);
      }
      navigate('/recipes');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isEditMode ? 'Edit Recipe' : 'Add New Recipe'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Dish Name"
          name="dishName"
          value={formData.dishName}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Preparation Time (e.g., 30 mins)"
          name="preparationTime"
          value={formData.preparationTime}
          onChange={handleChange}
          required
        />
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom>
          Ingredients
        </Typography>
        <List>
          {formData.ingredients.map((ingredient, index) => (
            <ListItem key={index}>
              <TextField
                fullWidth
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                required
              />
              <IconButton onClick={() => removeIngredient(index)} color="error">
                <RemoveCircle />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button
          startIcon={<AddCircle />}
          onClick={addIngredient}
          variant="outlined"
        >
          Add Ingredient
        </Button>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6" gutterBottom>
          Steps
        </Typography>
        <List>
          {formData.steps.map((step, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Step ${index + 1}`} />
              <TextField
                fullWidth
                multiline
                rows={2}
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                required
              />
              <IconButton onClick={() => removeStep(index)} color="error">
                <RemoveCircle />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button
          startIcon={<AddCircle />}
          onClick={addStep}
          variant="outlined"
          sx={{ mb: 3 }}
        >
          Add Step
        </Button>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          size="large"
        >
          {isEditMode ? 'Update Recipe' : 'Save Recipe'}
        </Button>
      </Box>
    </Box>
  );
};

export default RecipeForm;