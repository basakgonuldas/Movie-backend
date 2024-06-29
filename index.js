const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const port = 5000;

const mongoURI = 'mongodb+srv://gonuldasbasak78:basak@gonuldasbasak78.yn6vdbp.mongodb.net/?retryWrites=true&w=majority&appName=gonuldasbasak78';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

app.post('/api/auth/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });

    try {
        await user.save();
        res.status(200).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.status(200).send('Login successful');
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
