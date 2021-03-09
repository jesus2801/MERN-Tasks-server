import path from 'path';
import App from './config/server.config';
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

async function main() {
  const app = new App();
  const server = await app.listen();
  return server;
}

const server = main();
export default server;
