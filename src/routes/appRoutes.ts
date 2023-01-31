import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

const router = Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json({ type: 'application/vnd.api+json' }));

router.post('/products/add');
router.post('/products', (req: Request, res: Response) => {
  const {
    name,
    description,
    quantity,
    value,
    volume,
    classification,
    category,
  } = req.body;
  const product = {
    name,
    description,
    quantity,
    value,
    volume,
    classification,
    category,
  };

  return res.json(product);
});
router.get('/products/:id');
router.put('/products/:id');

router.delete('/products/:id');

export { router };
