import express from 'express'
// const express = require('express');
import ejs from 'ejs'
// const ejs = require('ejs');
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';

import path from 'path'
// const path = require('path');
import { fileURLToPath } from 'url';
import fs from 'fs';

import Photo from './models/Photo.js';


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

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index',{
    photos
  });
});

app.get('/photos/:id', async (req,res)=>{
  // console.log(req.params.id)
  const photo = await Photo.findById(req.params.id);
  res.render('photo',{
    photo
  });
});


app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  
  // console.log(req.files.image);
  // await Photo.create(req.body);
  // res.redirect('/');

  const __filename = fileURLToPath(import.meta.url);
  const __dirname=path.dirname(__filename);

  const uploadDir = 'public/uploads';

  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath,async () =>{
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name
    });
    res.redirect('/');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi.`);
});
