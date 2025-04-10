const express = require('express')
const checkDup = require('./checkDup')
const path = require('path')
const router = express.Router()
const Example = require('../model/Example')
const sendEmail = require('../sendEmail')

router.post('/submit', async (req,res)=>{
    try {
        const {name, email} = req.body
        const newExample = new Example({name, email})
        
        const isDup = await checkDup(email)
        if(isDup){
            res.status(500).send('Your email already exists in the database')
        }

        await newExample.save()
        console.log('saved to mongodb')
        res.send('Thank you! Your name and email is now in my database')
    } catch(error) {
        console.error('something went wrong yo')
        res.status(500).send('Something went wrong')
    }
})

router.get('/list', async (req,res)=>{
    try {
        const allExamples = await Example.find()
        const emailOnly = allExamples.map(person => person.email);
    res.json(emailOnly);
    } catch (err) {
        console.error('could not retrieve')
        res.status(500).send('Something went wrong')
    }
})

router.post('/send', async (req, res) => {
    try {
      await sendEmail(); // ✅ wait for the function to complete
      res.status(200).send("💌 Emails sent successfully");
    } catch (error) {
      console.error("Error sending emails:", error);
      res.status(500).send("❌ Failed to send emails");
    }
  });

module.exports = router