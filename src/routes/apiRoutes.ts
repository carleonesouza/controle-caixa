import { Router } from 'express';
import bodyParser from 'body-parser';
import * as controller from '../controllers/authController';

const routerApi = Router();
routerApi.use(bodyParser.json());
routerApi.use(bodyParser.urlencoded({ extended: false }));
routerApi.use(bodyParser.json({ type: 'application/vnd.api+json' }));

routerApi.post('/login', controller.login);
routerApi.post('/check', controller.check);
routerApi.post('/logout', controller.logout);

export { routerApi };
