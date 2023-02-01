import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('product')
export class ProductController {
  @Get('')
  public getProduct(req: Request, res: Response): void {
    res.status(200).send([
      {
        name: 'Cerveja Lata',
        category: 'Bebidas',
        quantity: 50,
        classification: 'ML',
        volume: 300,
        description: 'Cerveja Heineken',
        value: 10.5,
      },
    ]);
  }
}
