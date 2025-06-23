require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoConnection = require('./config/mongodb');
const tomakeRouter = require('./routes/tomakes');
const authRouter = require('./routes/auth');

const { authenticate } = require('./middlewares/authMiddleware');
const { requiredRole } = require('./middlewares/verifyRoleMiddleware');
// const userRouter = require('./routes/user'); // Uncomment this when you create it

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
mongoConnection();

// Routes
app.use('/auth', authRouter);
app.use('/tomakes', authenticate, tomakeRouter);

// Optional admin-protected user route (uncomment if implemented)
// app.use('/users', authenticate, requiredRole(['admin']), userRouter);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Server is successfully running' });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
