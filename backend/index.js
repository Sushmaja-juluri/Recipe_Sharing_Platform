const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoConnection=require('./config/mongodb');

const tomakeRoutes = require('./routes/tomakes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoConnection();

// ✅ Use the router
app.use('/tomakes', tomakeRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
