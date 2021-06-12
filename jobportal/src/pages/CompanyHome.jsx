import axios from "axios";
import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../component/NavBar";
const CompanyHome = () => {
	const [isLoggedin, setLogg] = useState(
		localStorage.getItem("token") == null ? false : true
	);
	const [jobs, setjobs] = useState({});
	const [pageNumber, setPagenumber] = useState(0);
	const Jobsperpage = 10;
	const pageVisited = pageNumber * Jobsperpage;
	const pageCount = Math.ceil(jobs.length / Jobsperpage);

	if (isLoggedin) {
		if (localStorage.getItem("type") == "Candidate")
			return <Redirect to='/CandidateHome' />;
	}

	if (isLoggedin) {
		let url =
			"http://localhost:3001/api/getJobsPostedByCompany/" +
			localStorage.getItem("token");
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setjobs(data.recordset);
			});
		if (localStorage.getItem("type") == "Candidate")
			return <Redirect to='/CandidateHome' />;
	} else if (!isLoggedin) {
		return <Redirect to='/Login'></Redirect>;
	}
	const displayJobs = Object.entries(jobs)
		.slice(pageVisited, pageVisited + Jobsperpage)
		.map((job, index) => {
			debugger;
			return (
				<li>
					<div class='container mt-3 bg-light border-dark'>
						<div class='d-flex p-1'>
							<div class='jobs p-1'>
								<h4>{job[1].JobRole}</h4>
							</div>
							<div class='jobs p-1 mr-auto'>
								<h4>{job[1].JobType}</h4>
							</div>
							<div class='jobs p-1'>
								<h4>{job[1].JobLocation}</h4>
							</div>
						</div>
						<div class='d-flex p-1'>
							<div class='jobs p-1'>
								<h5>Job Posted on</h5>
							</div>
							<div class='jobs p-1 mr-auto'>
								<h5>
									{new Date(job[1].PostingDate).getDate()}/
									{new Date(job[1].PostingDate).getMonth()}/
									{new Date(job[1].PostingDate).getFullYear()}
								</h5>
							</div>

							<div class='jobs p-2'>
								<h5>No of Applicants</h5>
							</div>
							<div class='jobs p-1'>
								<h5>{job[1].candidates}</h5>
							</div>
						</div>
					</div>
				</li>
			);
		});

	return (
		<>
			<NavBar />
			<ul type='none'>{displayJobs}</ul>
		</>
	);
};

export default CompanyHome;
