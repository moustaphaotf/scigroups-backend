import express from 'express';
import cors from 'cors';
import router from './routes/router.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express()

// App config
dotenv.config();
const port = process.env.PORT || 3000
const uri = process.env.STRING_URI;


// Middleware
app.use(cors());
app.use(express.json());


// DB config
mongoose.connect(uri);
mongoose.connection.once('open', () => console.log("DB connected"));


// API endpoints
app.use('/api/v1', router);
app.use('*', (req, res) => {
  res.status(404).json({error: "Not found"})
});


// Listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});