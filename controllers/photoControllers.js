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

import Photo from '../models/Photo.js';

const getAllPhotos = async (req, res) => {
  const page =req.query.page || 1;
  const photosPerPage =2;

  const totalPhotos = await Photo.find().countDocuments();

  const photos = await Photo.find({})
  .sort('-dateCreated')
  .skip((page-1)*photosPerPage)
  .limit(photosPerPage);

  await res.render('index',{
    photos:photos,
    current:page,
    pages:Math.ceil(totalPhotos/photosPerPage)
});

  // console.log(req.query);
  //   const photos = await Photo.find({}).sort('-dateCreated');
  //   res.render('index',{
  //     photos
  //   });
  }

const getPhoto=  async (req,res)=>{
    // console.log(req.params.id)
    const photo = await Photo.findById(req.params.id);
    res.render('photo',{
      photo
    });
  }

const createPhoto= async (req, res) => {
  
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
    let newFileName = `${Date.now()}-${uploadedImage.name}`;
    let uploadPath = __dirname + '/../public/uploads/' + newFileName;
  
    await sharp(uploadedImage.data)
      .resize(800,600,{fit:'cover'})
      .toFormat('jpeg')
      .jpeg({quality:80})
      .toFile(uploadPath);
  
    await Photo.create({
      ...req.body,
      image:'/uploads/'+newFileName
    });
    res.redirect('/');
    
  }

const updatePhoto = async(req,res)=>{
  const photo = await Photo.findOne({_id:req.params.id});
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
}

const deletePhoto = async (req,res)=>{

    const __filename = fileURLToPath(import.meta.url);
    const __dirname=path.dirname(__filename);
  
    const photo =await Photo.findOne({_id:req.params.id});
    let deletedImage = __dirname + '/../public' + photo.image 
    fs.unlinkSync(deletedImage);
  
    await Photo.findByIdAndDelete(req.params.id);
  
    res.redirect('/');
  }

export {getAllPhotos,getPhoto,createPhoto,updatePhoto,deletePhoto};