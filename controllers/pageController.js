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

const getAboutPage= (req, res) => {
    res.render('about');
  };

const getAddPage = (req, res) => {
    res.render('add');
  };

const getEditPage = async (req,res)=>{
    const photo = await Photo.findOne({_id: req.params.id});
    res.render('edit',{
      photo
    });
  };

export {getAboutPage,getAddPage,getEditPage};

