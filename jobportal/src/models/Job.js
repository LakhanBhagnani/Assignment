const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    CompanyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    JobRole: { type: String },
    Description: { type: String },
    Type: { type: String },
    Location: { type: String },
    MinimumSalary: { type: Number },
    MaximumSalary: { type: Number },
    RequiredQualification: { type: String },
    RequiredSkills: { type: String },
    RequiredExperience: { type: Number },
    PostingDate: { type: Date },
    IsArchived: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
