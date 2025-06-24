require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoConnection = require('./config/mongodb');
const tomakeRouter = require('./routes/tomakes');
const authRouter = require('./routes/auth');
const userRouter=require('./routes/user');

const { authenticate } = require('./middlewares/authMiddleware');
const { requiredRole } = require('./middlewares/verifyRoleMiddleware');


const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*'
}));

const PORT=process.env.PORT||3000;
// DB connection
mongoConnection();

// Routes
app.use('/auth', authRouter);
app.use('/tomakes',tomakeRouter);
app.use('/users',authenticate,requiredRole(['admin']),userRouter)


app.get('/', (req, res) => {
  return res.status(200).send({ message: 'Server is successfully running' });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
