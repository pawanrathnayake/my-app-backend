const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  salutation: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  homeAddress: { type: String },
  country: { type: String },
  postalCode: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String },
  maritalStatus: { type: String },
  spouseFirstName: { type: String },
  spouseLastName: { type: String },
  hobbies: { type: [String] },
  favoriteSport: { type: [String] },
  preferredMusic: { type: [String] },
  preferredMovies: { type: [String] },
  profileImage: { type: String },
});

module.exports = mongoose.model("User", userSchema);
