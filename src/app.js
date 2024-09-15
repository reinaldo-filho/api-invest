import express from 'express';
import qs from 'qs';

import errorHandling from './middlewares/errorHandling.js';
import routes from './routes/index.js';

const app = express();

// altera o pacote de análise para query da url
app.set('query parser', (str) => qs.parse(str, { comma: true }));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', routes);

// error handler
app.use(errorHandling);

export default app;
