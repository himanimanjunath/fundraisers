//protect routes so only logged in users w valid JWT token can access them 

import { Request, Response, NextFunction } from 'express';
//request - for HTTP request obj 
//response - type for HTTP response obj 
//next function - for next function in miiddleware to pass control to next function 

import jwt from 'jsonwebtoken';
//imports jsonwebtoken library - to sign and verify JWTs (JSON Web Tokens)

import dotenv from 'dotenv';
dotenv.config();
//importing dotenv so we can access vars in .env
//dotenv.config loads the vars into process.env so now process.env.JWT_SECRET will have the JWT key 

interface JWTPayload {
  id: string; //usually user ID from database
}

//custom request type that extends express's request 
export interface AuthRequest extends Request {
  userId?: string;
  //to store authenticated user id
}




