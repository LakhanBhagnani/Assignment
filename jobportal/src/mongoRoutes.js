const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Import Mongoose models
const Candidate = require('./models/Candidate.js');
const Company = require('./models/Company.js');
const Job = require('./models/Job.js');
const JobApplication = require('./models/JobApplication.js');

// ✅ Get all jobs (optionally filter by candidate ID if needed)
router.get('/api/AllJobs/:userId', async (req, res) => {
    try {
        const jobs = await Job.find({ IsArchived: false });
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get candidate details by username
router.get('/api/getCandidateDetails/:username', async (req, res) => {
    try {
        const candidate = await Candidate.findOne({ Username: req.params.username });
        res.status(200).json(candidate);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Archive a job
router.get('/api/archiveJob/:job_id', async (req, res) => {
    try {
        await Job.findByIdAndUpdate(req.params.job_id, { IsArchived: true });
        res.status(200).json({ message: 'Job archived' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Unarchive a job
router.get('/api/UnarchiveJob/:job_id', async (req, res) => {
    try {
        await Job.findByIdAndUpdate(req.params.job_id, { IsArchived: false });
        res.status(200).json({ message: 'Job unarchived' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Add a job
router.post('/api/addJob', async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(200).json({ message: 'Job added', job });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get company details by username
router.get('/api/getCompanyDetails/:username', async (req, res) => {
    try {
        const company = await Company.findOne({ Username: req.params.username });
        res.status(200).json(company);
    } catch (err) {
        console.log("Please register as a company first");
        //res.status(500).json({ error: err.message });
    }
});

// ✅ Get jobs by qualification
router.get('/api/getJobsbyQualification/:qualification', async (req, res) => {
    try {
        const jobs = await Job.find({
            RequiredQualification: req.params.qualification,
            IsArchived: false
        });
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get applied jobs for a candidate
router.get('/api/getAJ/:username', async (req, res) => {
    try {
        const candidate = await Candidate.findOne({ Username: req.params.username });
        if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

        const applications = await JobApplication.find({ CandidateId: candidate._id })
            .populate('JobId');
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get candidates who applied for company jobs
router.get('/api/getJobCandidates/:username', async (req, res) => {
    try {
        const company = await Company.findOne({ Username: req.params.username });
        const jobs = await Job.find({ CompanyId: company._id });
        const jobIds = jobs.map(job => job._id);

        const candidates = await JobApplication.find({ JobId: { $in: jobIds } })
            .populate('CandidateId');
        res.status(200).json(candidates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get jobs posted by company
router.get('/api/getJobsPostedByCompany/:username', async (req, res) => {
    try {
        const company = await Company.findOne({ Username: req.params.username });
        const jobs = await Job.find({ CompanyId: company._id });
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Register candidate
router.post('/api/registerCandidate', async (req, res) => {
    try {
        const candidate = new Candidate(req.body);
        await candidate.save();
        res.status(200).json({ message: 'Candidate added', candidate });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Register company
router.post('/api/companyRegister', async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(200).json({ message: 'Company added', company });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Apply for job
router.post('/api/applyNow', async (req, res) => {
    try {
        const application = new JobApplication({
            JobId: req.body.value,
            CandidateId: req.body.userId,
            JobStatus: 'Applied',
            AppliedDate: req.body.appliedDate
        });
        await application.save();
        res.status(200).json({ message: 'Applied successfully', application });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Update candidate's job status
router.post('/api/setCandidateStatus', async (req, res) => {
    try {
        await JobApplication.findOneAndUpdate(
            { JobId: req.body.jobId, CandidateId: req.body.UserId },
            { JobStatus: req.body.status }
        );
        res.status(200).json({ message: 'Status updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Check if candidate already applied
router.post('/api/isApplied', async (req, res) => {
    try {
        const exists = await JobApplication.findOne({
            JobId: req.body.j_id,
            CandidateId: req.body.userId
        });
        res.status(200).json({ applied: !!exists });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
