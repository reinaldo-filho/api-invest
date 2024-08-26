import express from 'express';

import errorHandling from './middlewares/errorHandling.js';
import routes from './routes/index.js';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api', routes);

// error handler
app.use(errorHandling);

export default app;
