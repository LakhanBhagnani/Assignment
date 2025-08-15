const mongoose = require('mongoose');
const jobApplicationSchema = new mongoose.Schema({
    JobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    CandidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    JobStatus: { type: String, default: 'Applied' },
    AppliedDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
