import './util/module-alias';
import { app } from './app/app';
import util from './util/baseUtil';

const server = app.listen(util.PORT, () => {
  console.log(`Connection was established on  port  ${util.PORT}`);
});

process.on('SIGINT', () => {
  server.close();
  console.log('\nApp ended sucessfully!');
});
