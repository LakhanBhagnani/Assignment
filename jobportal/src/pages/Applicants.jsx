import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../component/NavBar";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const Applicants = () => {
	const [applications, setapplications] = useState({});
	const [userdetails, setUserdetails] = useState(
		JSON.parse(localStorage.getItem("UserDetails"))
	);
	const [isLoggedin, setLogg] = useState(
		localStorage.getItem("token") == null ? false : true
	);
	const [pageNumber, setPagenumber] = useState(0);
	const applicationsperpage = 10;
	const pageVisited = pageNumber * applicationsperpage;
	const pageCount = Math.ceil(applications.length / applicationsperpage);
	const user = userdetails.Username;
	const loadData = () => {
		fetch("http://localhost:3001/api/getJobCandidates/" + user)
			.then((response) => response.json())
			.then((data) => {
				setapplications(data.recordset);
			});
	};
	useEffect(() => {
		loadData();
	}, []);
	if (isLoggedin) {
		if (localStorage.getItem("type") === "Candidate")
			return <Redirect to='/CandidateHome' />;
	} else if (!isLoggedin) {
		return <Redirect to='/Login'></Redirect>;
	}
	const distinctProfile = Object.entries(applications)
		.map(function (x) {
			return x[1].JobRole;
		})
		.filter(function test(val, ind, self) {
			return self.indexOf(val) === ind;
		});
	const distinctStatus = Object.entries(applications)
		.map(function (x) {
			return x[1].JobStatus;
		})
		.filter(function test(val, ind, self) {
			return self.indexOf(val) === ind;
		});
	const statusRender = distinctStatus.map((Status) => {
		return (
			<Dropdown.Item onClick={() => statusFilter(Status)}>
				{Status}
			</Dropdown.Item>
		);
	});
	const RoleRender = distinctProfile.map((Role) => {
		return (
			<Dropdown.Item onClick={() => Rolefilter(Role)}>{Role}</Dropdown.Item>
		);
	});
	const Rolefilter = (role) => {
		let filtered = applications.filter((e) => {
			return e.JobRole == role;
		});
		setapplications(filtered);
	};
	const statusFilter = (status) => {
		let filtered = applications.filter((e) => {
			return e.JobStatus == status;
		});
		setapplications(filtered);
	};

	const displayapplications = Object.entries(applications)
		.slice(pageVisited, pageVisited + applicationsperpage)
		.map((application, index) => {
			return (
				<tr>
					<td>
						{application[1].FirstName} {application[1].LastName}
					</td>
					<td>{application[1].JobRole}</td>
					<td>{application[1].JobStatus}</td>
					<td>
						<DropdownButton
							id='dropdown-basic-button'
							title='Application Status'>
							<Dropdown.Item
								onClick={() =>
									setStatus(
										application[1].CANDIDATE_ID,
										application[1].JOB_ID,
										"Profile Reviewed"
									)
								}>
								Profile Reviewed
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() =>
									setStatus(
										application[1].CANDIDATE_ID,
										application[1].JOB_ID,
										"Interview Scheduled"
									)
								}>
								Interview Scheduled
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() =>
									setStatus(
										application[1].CANDIDATE_ID,
										application[1].JOB_ID,
										"Accepted"
									)
								}>
								Accepted
							</Dropdown.Item>
							<Dropdown.Item
								onClick={() =>
									setStatus(
										application[1].CANDIDATE_ID,
										application[1].JOB_ID,
										"Rejected"
									)
								}>
								Rejected
							</Dropdown.Item>
						</DropdownButton>
					</td>
				</tr>
			);
		});
	const setStatus = (UserId, jobId, status) => {
		let obj = {
			status,
			jobId,
			UserId,
		};
		axios
			.post("http://localhost:3001/api/setCandidateStatus/", obj)
			.then((response) => {
				if (response) {
					console.log(response);
					loadData();
				}
			});
	};
	return (
		<>
			<NavBar />
			<div class='filters d-flex'>
				<DropdownButton id='dropdown-basic-button' title='Status'>
					<Dropdown.Item onClick={() => loadData()}>All</Dropdown.Item>
					{statusRender}
				</DropdownButton>
				<DropdownButton id='dropdown-basic-button' title='Job-Profile'>
					<Dropdown.Item onClick={() => loadData()}>All</Dropdown.Item>
					{RoleRender}
				</DropdownButton>
			</div>
			<br />
			<table class='table table-hover'>
				<thead>
					<tr>
						<th scope='col'>Name</th>
						<th scope='col'>Job Profile</th>
						<th scope='col'>Status</th>
						<th scope='col'>Set Status</th>
					</tr>
				</thead>
				<tbody>{displayapplications}</tbody>
			</table>
		</>
	);
};

export default Applicants;
