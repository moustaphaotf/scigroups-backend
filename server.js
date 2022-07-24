import express from 'express';
import cors from 'cors';
import router from './routes/router.js';
const app = express()

// App config
const port = process.env.PORT || 3000


// Middleware
app.use(cors());
app.use(express.json());


// DB config

// API endpoints
app.use('/api/v1', router);
app.use('*', (req, res) => {
  res.status(404).json({error: "Not found"})
});


// Listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})