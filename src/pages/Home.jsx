import { Link } from 'react-router-dom';
import { 
  Typography, 
  Button, 
  Container, 
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useAuth();

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        textAlign: 'center', 
        mt: isMobile ? 4 : 10,
        px: 2
      }}
    >
      <Typography 
        variant={isMobile ? 'h3' : 'h2'} 
        gutterBottom
        sx={{ 
          fontWeight: 700,
          color: theme.palette.primary.main
        }}
      >
        Welcome to Recipe Sharing
      </Typography>
      
      <Typography 
        variant={isMobile ? 'h6' : 'h5'} 
        gutterBottom 
        sx={{ 
          mb: 4,
          color: theme.palette.text.secondary
        }}
      >
        Discover and share delicious recipes with the community
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 2,
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/recipes"
          sx={{
            px: 4,
            py: 1.5
          }}
        >
          Browse Recipes
        </Button>
        <Button
          variant={user ? "contained" : "outlined"}
          size="large"
          component={Link}
          to={user ? "/add-recipe" : "/register"}
          sx={{
            px: 4,
            py: 1.5,
            bgcolor: user ? theme.palette.secondary.main : undefined
          }}
        >
          {user ? 'Add Your Recipe' : 'Join Now'}
        </Button>
      </Box>
    </Container>
  );
};

export default Home;