import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import jsdom from 'jsdom';
import mysql from 'mysql2/promise';

import morgan from 'morgan';
import app from './app.js';


// ENVIRONMENT
dotenv.config({ path: "./config.env" });


// 2. JSDOM - get virtual DOM window
const { JSDOM } = jsdom;
const VIRTUAL_WINDOW = new JSDOM(`
    <!DOCTYPE html>
      <html lang="en">
        <head></head>
        <body></body>
      </html>
`).window;

// DECLARATION
const NODE_HOST = process.env.NODE_ENV || "localhost";
const NODE_PORT = Number(process.env.NODE_PORT) || 3002;

// SERVER OPERATION
app.listen(NODE_PORT, () => {
  console.log(`App is listenings to http:;//${NODE_HOST}:${NODE_PORT}`);
});