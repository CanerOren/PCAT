import express from 'express'
// const express = require('express');
import ejs from 'ejs'
// const ejs = require('ejs');
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import sharp from 'sharp';
import methodOverride from 'method-override';

import path from 'path'
// const path = require('path');
import { fileURLToPath } from 'url';
import fs from 'fs';

import Photo from './models/Photo.js';
import {getAllPhotos,getPhoto,createPhoto,updatePhoto,deletePhoto} from './controllers/photoControllers.js'
import { getAboutPage,getAddPage,getEditPage } from './controllers/pageController.js';

const app = express();


// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db')
  .then(()=>{console.log('Succesfully connected MongoDB')})
  .catch((err)=>{console.log(`Connection error ${err}`)});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))

//ROUTES
app.get('/', getAllPhotos);
app.get('/photos/:id', getPhoto);
app.post('/photos', createPhoto);
app.put('/photos/:id', updatePhoto);
app.delete('/photos/:id', deletePhoto);

app.get('/about', getAboutPage);

app.get('/add', getAddPage);

app.get('/photos/edit/:id', getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi.`);
});