const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/userDetails');

const router = express();

// Middleware
router.use(bodyParser.json());

// Define a route for the POST request to insert data
router.post('/api/users', async (req, res) => {
  try {
    // Extract data from the request body
    const { firstname, lastname, phone, email, hobbies } = req.body;

    // Create a new user instance
    const newUser = new User({
      firstname,
      lastname,
      phone,
      email,
      hobbies,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ success: true, message: 'User created successfully', user: savedUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
router.put('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update user data with the request body
    existingUser.firstname = req.body.firstname || existingUser.firstname;
    existingUser.lastname = req.body.lastname || existingUser.lastname;
    existingUser.phone = req.body.phone || existingUser.phone;
    existingUser.email = req.body.email || existingUser.email;
    existingUser.hobbies = req.body.hobbies || existingUser.hobbies;

    // Save the updated user to the database
    const updatedUser = await existingUser.save();

    res.json({ success: true, message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Define a route for the DELETE request to delete data
router.delete('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});
// Backend route for fetching user details by ID
// Backend route for fetching all users
router.get('/api/allusers', async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, message: 'No users found' });
    }

    res.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});



module.exports = router;
