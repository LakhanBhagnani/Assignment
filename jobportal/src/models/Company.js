const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    RecruiterName: { type: String },
    RecruiterEmailID: { type: String },
    FoundDate: { type: Date },
    CompanyDescription: { type: String },
    CompanyLocation: { type: String },
    Username: { type: String, required: true, unique: true },
    UserPassword: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
