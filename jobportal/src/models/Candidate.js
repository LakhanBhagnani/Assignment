const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    CandidateEmailID: { type: String, required: true },
    FirstName: { type: String, required: true },
    LastName: { type: String },
    Username: { type: String, required: true, unique: true },
    UserPassword: { type: String, required: true },
    DateOfBirth: { type: Date },
    Qualification: { type: String },
    PassingYear: { type: Date },
    CurrentCity: { type: String },
    Skills: { type: String },
    ExperienceInYears: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
