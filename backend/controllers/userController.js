const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// GET all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        return res.status(200).send({ users });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        return res.status(500).send({ error: 'Failed to fetch users' });
    }
};

// GET single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).send({ error: 'User not found' });
        return res.status(200).send({ user });
    } catch (error) {
        console.error('Error fetching user:', error.message);
        return res.status(500).send({ error: 'Failed to fetch user' });
    }
};

// CREATE new user (optional, usually not done via admin)
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).send({ error: 'Email already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, role });

        await newUser.save();
        return res.status(201).send({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error.message);
        return res.status(400).send({ error: 'Failed to create user' });
    }
};

// UPDATE user
exports.updateUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const updatedFields = { username, email, role };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
        if (!updatedUser) return res.status(404).send({ error: 'User not found' });

        return res.status(200).send({ message: 'User updated', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error.message);
        return res.status(400).send({ error: 'Failed to update user' });
    }
};

// DELETE user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).send({ error: 'User not found' });

        return res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error.message);
        return res.status(500).send({ error: 'Failed to delete user' });
    }
};
