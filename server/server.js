const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', noteRoutes);  // ✅ Add this line


connectDB().then(() => {
  app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
});
