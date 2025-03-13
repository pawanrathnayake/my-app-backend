// userController.js

const User = require('../models/User');  // User model to interact with MongoDB

// Get the user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);  // Get the user from the database by ID
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      salutation: user.salutation,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      homeAddress: user.homeAddress,
      country: user.country,
      postalCode: user.postalCode,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      maritalStatus: user.maritalStatus,
      spouseFirstName: user.spouseFirstName,
      spouseLastName: user.spouseLastName,
      hobbies: user.hobbies,
      favoriteSport: user.favoriteSport,
      preferredMusic: user.preferredMusic,
      preferredMovies: user.preferredMovies,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update the user profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });  // Update the user's profile
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      salutation: user.salutation,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      homeAddress: user.homeAddress,
      country: user.country,
      postalCode: user.postalCode,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      maritalStatus: user.maritalStatus,
      spouseFirstName: user.spouseFirstName,
      spouseLastName: user.spouseLastName,
      hobbies: user.hobbies,
      favoriteSport: user.favoriteSport,
      preferredMusic: user.preferredMusic,
      preferredMovies: user.preferredMovies,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProfile, updateProfile };