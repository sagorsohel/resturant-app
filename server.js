const express=require('express');
const morgan=require('morgan');
const cors=require('cors');

const app=express();

// Middleware
app.use(express.json());    
// Parse JSON bodies
app.use(morgan('dev'));
// Log requests to the console
app.use(cors());


