const sql = require("mssql");
const express = require("express");
const cors = require("cors");
const routing = express();
var config = {
	server: "DESKTOP-V5FSTDD\\SQLEXPRESS",
	user: "lakhan",
	password: "lakhan",
	options: {
		trustedConnection: true,
		trustServerCertificate: true,
	},
};
sql.on("error", (err) => {
	console.log(err.message);
});
routing.use(express.json());
routing.use(cors());
routing.get("/api/AllJobs", function (req, res) {
	sql
		.connect(config)
		.then((pool) => {
			return pool.request().execute("SPGetJobDetails");
		})
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err.message);
		});
});
routing.get("/api/getCandidateDetails/:username", function (req, res) {
	sql
		.connect(config)
		.then((pool) => {
			return pool
				.request()
				.input("user", sql.VarChar, req.params.username)
				.query("select * from CandidateTB where username = @user");
		})
		.then((result) => {
			console.log("result sent to client");
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err.message);
		});
});
routing.get("/api/getCompanyDetails/:username", function (req, res) {
	sql
		.connect(config)
		.then((pool) => {
			return pool
				.request()
				.input("company", sql.VarChar, req.params.username)
				.query("select * from CompanyTB where username = @company");
		})
		.then((result) => {
			console.log("result sent to client");
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err.message);
		});
});
routing.get("/api/getJobsbyQualification/:qualification", function (req, res) {
	sql
		.connect(config)
		.then((pool) => {
			return pool
				.request()
				.input("qualification", sql.VarChar, String(req.params.qualification))
				.execute("SPGetActiveJobsbyQualification");
		})
		.then((result) => {
			console.log("result sent to client");
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err.message);
		});
});
//API TO FETCH ALL THE APPLIED JOBS
routing.get("/api/getAJ/:username", function (req, res) {
	sql
		.connect(config)
		.then((pool) => {
			return pool
				.request()
				.input("username", sql.VarChar, String(req.params.username))
				.execute("SPCandidateAppliedJobs");
		})
		.then((result) => {
			console.log("result sent to client");
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err.message);
		});
});
//API TO GET THE CANDIDATES WHO HAVE APPLIED FOR JOBS IN COMPANY
routing.get("/api/getJobCandidates/:username", function (req, res) {
	sql
		.connect(config)
		.then((pool) => {
			return pool
				.request()
				.input("username", sql.VarChar, String(req.params.username))
				.execute("SPCandidatesForJob");
		})
		.then((result) => {
			console.log("result sent to client");
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err.message);
		});
});
routing.get("/api/getJobsPostedByCompany/:username", function (req, res) {
	sql
		.connect(config)
		.then((pool) => {
			return pool
				.request()
				.input("username", sql.VarChar, String(req.params.username))
				.execute("SPJobPostedByCompany");
		})
		.then((result) => {
			console.log("result sent to client");
			res.status(200).json(result);
		})
		.catch((err) => {
			console.log(err.message);
		});
});

routing.post("/api/registerCandidate/", function (req, res) {
	let details = req.body;
	console.log(details);
	sql
		.connect(config)
		.then((pool) => {
			return pool
				.request()
				.input("CandidateEmailID", sql.VarChar, String(details.email))
				.input("FirstName", sql.VarChar, String(details.Fname))
				.input("LastName", sql.VarChar, String(details.LName))
				.input("Username", sql.VarChar, String(details.Username))
				.input("UserPassword", sql.VarChar, String(details.Password))
				.input("DateOfBirth", sql.Date, Date(details.DOB))
				.input("Qualification", sql.VarChar, String(details.Qualification))
				.input("PassingYear", sql.Date, Date(details.PassingDate))
				.input("CurrentCity", sql.VarChar, String(details.CurrentCity))
				.input("Skills", sql.VarChar, String(details.Skills))
				.input("ExperienceInYears", sql.Int, parseInt(details.Experience))
				.execute("AddCandidate");
		})
		.then((result) => {
			console.log("result sent to client" + result);
			res.status(200).json("Candidate Added");
		})
		.catch((err) => {
			console.log(err.message);
		});
});

routing.post("/api/companyRegister", function (req, res) {
	let details = req.body;
	console.log(details);
	sql
		.connect(config)
		.then((pool) => {
			return pool
				.request()
				.input("CompanyName", sql.VarChar, details.CompanyName)
				.input("RecruiterName", sql.VarChar, details.RecruiterName)
				.input("RecruiterEmailID", sql.VarChar, details.RecruiterEmailID)
				.input("FoundDate", sql.Date, details.FoundDate)
				.input("CompanyDescription", sql.VarChar, details.CompanyDescription)
				.input("CompanyLocation", sql.VarChar, details.CompanyLocation)
				.input("Username", sql.VarChar, details.Username)
				.input("UserPassword", sql.VarChar, details.UserPassword)
				.execute("AddCompany");
		})
		.then((result) => {
			console.log("Company added");
			res.status(200).json("Company Added");
		})
		.catch((err) => {
			console.log(err.message);
			console.log(req);
		});
});

routing.post("/api/applyNow", function (req, res) {
	let details = req.body;
	let status = "Applied";
	console.log(details);
	sql
		.connect(config)
		.then((pool) => {
			return pool
				.request()
				.input("JOB_ID_FK", sql.Int, details.value)
				.input("CANDIDATE_ID_FK", sql.Int, details.userId)
				.input("JobStatus", sql.VarChar, status)
				.input("AppliedDate", sql.Date, Date(details.appliedDate))
				.execute("SPJobApply");
		})
		.then((result) => {
			console.log("Company added");
			res.status(200).json("Company Added");
		})
		.catch((err) => {
			console.log(err.message);
		});
});
routing.post("/api/setCandidateStatus", function (req, res) {
	let status = req.body.status;
	let jobId = req.body.jobId;
	let UserId = req.body.UserId;
	sql
		.connect(config)
		.then((pool) => {
			return pool
				.request()
				.input("NewStatus", sql.VarChar, status)
				.input("JobID", sql.BigInt, jobId)
				.input("UserID", sql.BigInt, UserId)
				.execute("SPUpdateCandidatesJobStatus");
		})
		.then((result) => {
			console.log("Status Updated");
			res.status(200).json("Status Updated");
		})
		.catch((err) => {
			console.log(err.message);
		});
});

routing.listen(3001, () => {
	console.log("database is running");
});
