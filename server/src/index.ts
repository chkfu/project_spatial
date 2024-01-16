import express, { Express } from 'express';
import * as dotenv from 'dotenv';

// ENVIRONMENT
dotenv.config({ path: "./config.env" });

// EXPRESS ROUTER
const app: Express = express();

// DECLARATION
const NODE_HOST = process.env.NODE_ENV || "localhost";
const NODE_PORT = Number(process.env.NODE_PORT) || 3002;

// SERVER OPERATION
app.listen(NODE_PORT, () => {
  console.log(`App is listenings to the http://${NODE_HOST}:${3000}`);
});