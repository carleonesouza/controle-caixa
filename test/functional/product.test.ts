import { SetupServer } from '@src/app/server' ;
import supertest from 'supertest';

const server = new SetupServer();
const app = server.getApp();

beforeAll(() => {
  server.init();
});

describe('Teste funcional de um produto', () => {
  it('Deve retornar um produto', async () => {
    const { body, status } = await supertest(app).get('/product');
    expect(status).toBe(200);
    expect(body).toEqual([{
      name: 'Cerveja Lata',
      category: 'Bebidas',
      quantity: 50,
      classification: 'ML',
      volume: 300,
      description: 'Cerveja Heineken',
      value: 10.5,
    }]);
  });
});
