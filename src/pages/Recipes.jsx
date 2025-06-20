import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, TextField, Box } from '@mui/material';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let url = 'http://localhost:5000/api/recipes';
        if (location.pathname === '/search') {
          url += `/search?query=${searchQuery}`;
        }
        const res = await axios.get(url);
        setRecipes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipes();
  }, [location.pathname, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search');
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box component="form" onSubmit={handleSearch} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search recipes by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button type="submit" variant="contained">
                Search
              </Button>
            )
          }}
        />
      </Box>
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {recipe.dishName}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  Prep Time: {recipe.preparationTime}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  By: {recipe.author.username}
                </Typography>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/recipes/${recipe._id}`}
                >
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Recipes;