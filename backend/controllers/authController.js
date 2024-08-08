const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered', user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, id: user.id, email: user.email });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getuserById = async (req, res) => {
    try {

        const user = await User.findOne({ where: { id: req.params.id } });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Invalid user Id' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getusers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        let hashedPassword;
        if (password) hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findByPk(id);
        if (user) {
            await user.update({ username, email, password: hashedPassword });
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Invalid user Id' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};