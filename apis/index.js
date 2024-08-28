const express = require("express");
const User = require('./models/User');
const bcrypt = require('bcrypt');
const app = express();
const port = 4000;
const cors = require('cors');
const Post = require('./models/Post');
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secret = 'kvhlsavlafjafvlasvb';

const salt = bcrypt.genSaltSync(10);

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

// Mongoose connection with error handling
mongoose.connect('mongodb+srv://frypan:xNKiFsdpMXj4YPcg@cluster0.vlixu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
        return res.status(400).json("User not found");
    }
    const correctPass = bcrypt.compareSync(password, userDoc.password);
    if (correctPass) {
        // logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username
            });
        });
    } else {
        res.status(400).json("Wrong credentials");
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
    }
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        res.json(info);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

app.post('/post', async(req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content, file } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            file,
            author: info.id
        });
        res.json(postDoc);
    });
});

app.get('/post', async (req, res) => {
    res.json(await Post.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(30)
    );
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
