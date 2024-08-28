const express = require("express");
const User = require('./models/User');
const bcrypt = require('bcrypt');
const app = express();
const port = 4000;
const cors = require('cors');
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secret = 'kvhlsavlafjafvlasvb';



const salt = bcrypt.genSaltSync(10);

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://frypan:xNKiFsdpMXj4YPcg@cluster0.vlixu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/register', async(req, res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username, 
            password:bcrypt.hashSync(password, salt),
        })
        res.json(userDoc)
    }catch(e){
        res.status(400).json(e)
    }
})

app.post('/login', async(req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username})
    const correctPass = bcrypt.compareSync(password, userDoc.password);
    if(correctPass){
        //logged in
        jwt.sign({username, id:userDoc._id}, secret, {} , (err, token)=>{
            if(err) throw err;
            res.cookie('token', token).json('ok');
        });
    }else{
        res.status(400).json("wrong credentials")
    }
})

app.get('/profile', (req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info)=>{
        if(err) throw err;
        res.json(info); 
    })
})

app.post('/logout', (req, res)=>{
    res.cookie('token', '').json('ok');
})

app.listen(port, ()=>{
    console.log(`Listening at port ${port}`);
})

