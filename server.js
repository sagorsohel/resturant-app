const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const dotenv=require('dotenv');

const app=express();



// Middleware
app.use(express.json());    
// Parse JSON bodies
app.use(morgan('dev'));
// Log requests to the console
app.use(cors());
// Enable CORS for all routes
dotenv.config();
// Load environment variables from .env file




