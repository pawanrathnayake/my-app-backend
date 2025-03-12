const User = require('../models/User');
const path = require('path');

// Get the user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
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
      profileImage: user.profileImage ? `${req.protocol}://${req.get('host')}/uploads/${user.profileImage}` : null, // Return full URL
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update the user profile (including image upload)
const updateProfile = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Check if an image is uploaded
    if (req.file) {
      updateData.profileImage = req.file.filename; // Store filename in DB
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
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
      profileImage: user.profileImage ? `${req.protocol}://${req.get('host')}/uploads/${user.profileImage}` : null, // Return full URL
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProfile, updateProfile };
