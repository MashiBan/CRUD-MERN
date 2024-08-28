const express = require("express");
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Post = require('./models/Post');
const cors = require('cors');

const app = express();
const port = 4000;
const secret = 'kvhlsavlafjafvlasvb';
const salt = bcrypt.genSaltSync(10);

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
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

// Register a new user
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

// Login user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });

    if (!userDoc) {
        return res.status(400).json("User not found");
    }

    const correctPass = bcrypt.compareSync(password, userDoc.password);
    if (correctPass) {
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

// Get user profile
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

// Logout user
app.post('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) }).json('ok');
});

// Create a new post
app.post('/post', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        
        const { title, summary, content, file } = req.body;
        try {
            const postDoc = await Post.create({
                title,
                summary,
                content,
                file,
                author: info.id
            });
            res.json(postDoc);
        } catch (e) {
            res.status(400).json(e);
        }
    });
});

// Update a post
app.put('/post', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });

        const { id, title, summary, content, file } = req.body;

        try {
            const postDoc = await Post.findById(id);
            if (!postDoc) {
                return res.status(404).json({ error: 'Post not found' });
            }

            if (postDoc.author.equals(info.id)) {
                postDoc.title = title;
                postDoc.summary = summary;
                postDoc.content = content;
                postDoc.file = file;
                
                await postDoc.save();
                res.json(postDoc);
            } else {
                res.status(403).json({ error: 'Access denied' });
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });
});

// Get all posts
app.get('/post', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', ['username'])
            .sort({ createdAt: -1 })
            .limit(30);
        res.json(posts);
    } catch (e) {
        res.status(500).json(e);
    }
});

// Get a specific post by ID
app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid post ID format' });
    }

    try {
        const postDoc = await Post.findById(id).populate('author', ['username']);
        if (!postDoc) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(postDoc);
    } catch (e) {
        res.status(500).json(e);
    }
});

// Delete a post
app.delete('/post/:id', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });

        const { id } = req.params;

        try {
            const postDoc = await Post.findById(id);
            if (!postDoc) {
                return res.status(404).json({ error: 'Post not found' });
            }

            if (postDoc.author.equals(info.id)) {
                await Post.findByIdAndDelete(id);
                res.json({ message: 'Post deleted successfully' });
            } else {
                res.status(403).json({ error: 'Access denied' });
            }
        } catch (e) {
            res.status(500).json(e);
        }
    });
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
