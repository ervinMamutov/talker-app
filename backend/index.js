import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import logger from './middleware/logger.js';
import connectToDB from './config/db.js';
import initializeSocket from './socket/socket.js';

import userRoutes from './routes/user.js';
import chatRoutes from './routes/chat.js';

dotenv.config();
connectToDB();

const PORT = process.env.PORT || 3005;

const app = express();

// cors
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use(userRoutes);
app.use(chatRoutes);

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal Server Error'
  });
});

// 404 error
app.use('*', (req, res) => {
  req.status(404).json({
    message: 'Page Not Found'
  });
});

// listener
const server = app.listen(PORT, () => {
  console.log(`Server is up and running successfully by port ${PORT}`);
});

// socket io
initializeSocket(server);
