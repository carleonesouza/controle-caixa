import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import swaggerUi = require('swagger-ui-express');
import swaggerDocs = require('../docs/swagger.json');
import cors = require('cors');
import fs = require('fs');
import { routerApi } from '../routes/apiRoutes';
import { router } from '../routes/appRoutes';

const app: Application = express();
const customCss: string = fs.readFileSync(
  process.cwd() + '/src/docs/swagger.css',
  'utf8'
);

app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());
app.use(express.json());

app.use((req: Request, res: Response, next) => {
  //res.setHeader('Content-Type', 'application/json');
  res.header('Content-Type', 'text/html; charset=utf-8');
  res.header('Access-Control-Allow-Origin', '*');

  if (req.method == 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Session, api_key'
    );
    res.statusCode = 200;
    res.end();
    return;
  }
  next();
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, undefined, undefined, customCss)
);

app.use('/v1/api/management', routerApi);
app.use('/v1/api/management', router);
//app.use('/api/management', httpUtilite.checkAuth, require('./routes/appRoutes'));

// Basic 404 handler
app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ id: req.params.id, status: 404, message: 'Not found' })
    .end();
});

// Basic error handler
app.use((req: Request, res: Response) => {
  res
    .status(500)
    .json({ id: req.params.id, status: 500, message: 'Internal server error' })
    .end();
});

export { app };
