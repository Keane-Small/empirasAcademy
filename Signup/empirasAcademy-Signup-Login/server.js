const express = require('express');
const cors = require('cors');
const admin = require('./firebaseAdmin')
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;//1000

const fetch = require('node-fetch');

app.post('/signup', async (req,res) => {
    const {name, username, email} = req.body;

    try{
        /*const userRecord = await admin.auth().createUser({
            displayName: username,
            email,
            password,
        });*/
        const userRecord = await admin.auth().getUserByEmail(email);
        await admin.auth().updateUser(userRecord.uid, {
            displayName: username,
        });

        res.status(201).json({
            message: "User Successfully Created",
            uid: userRecord.uid,
            email: userRecord.email,
        });
    } catch (error){
        console.log("error creating user" + error.message);
        res.status(500).json({error:"Failed to create user, Please try again."});
    }
});