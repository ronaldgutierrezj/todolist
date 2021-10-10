require('dotenv').config()
const mongoose = require ('mongoose');

//___________________
//Dependencies
//___________________
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');



//___________________
//Database Connection
//___________________
// How to connect to the database either via heroku or locally

const DATABASE_URL = process.env.DATABASE_URL;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
const db = mongoose.connection;
mongoose.connect(DATABASE_URL , { useNewUrlParser: true, useUnifiedTopology: true }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', DATABASE_URL));
db.on('disconnected', () => console.log('mongod disconnected'));

module.exports = mongoose