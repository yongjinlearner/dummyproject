const express = require('express')
const path = require('path')
const router = express.Router()
const Example = require('../model/Example')

const checkDup = async (email) => {
    const found = await Example.findOne({ email });
  
    if (found) {
      console.log("Duplicate was found. Unable to add");
      return true;
    }
  
    console.log("There are no duplicate emails found");
    return false;
  };

  module.exports = checkDup