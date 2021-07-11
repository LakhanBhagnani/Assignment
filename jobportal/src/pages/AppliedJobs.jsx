import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ReactPaginate from "react-paginate";
import { Redirect } from "react-router-dom";
import NavBar from "../component/NavBar";
const AppliedJobs = () => {
	const [jobs, setJobs] = useState({});
	const [userdetails] = useState(
		JSON.parse(localStorage.getItem("UserDetails"))
	);
	const [isLoggedin] = useState(
		localStorage.getItem("token") == null ? false : true
	);

	const changePage = ({ selected }) => {
		setPagenumber(selected);
	};
	const loadData = () => {
		const user = userdetails.Username;
		fetch("http://localhost:3001/api/getAJ/" + user)
			.then((response) => response.json())
			.then((data) => {
				setJobs(data.recordset);
			});
	};
	useEffect(() => {
		loadData();
	}, []);
	const [pageNumber, setPagenumber] = useState(0);
	const Jobsperpage = 10;
	const pageVisited = pageNumber * Jobsperpage;
	const pageCount = Math.ceil(jobs.length / Jobsperpage);

	const displayJobs = Object.entries(jobs)
		.slice(pageVisited, pageVisited + Jobsperpage)
		.map((job, index) => {
			return (
				<tr>
					<th scope='row'>{index + 1}</th>
					<td>{job[1].CompanyName}</td>
					<td>{job[1].JobRole}</td>
					<td>{job[1].JobType}</td>
					<td>
						{new Date(job[1].PostingDate).getDate()}/
						{new Date(job[1].PostingDate).getMonth() + 1}/
						{new Date(job[1].PostingDate).getFullYear()}
					</td>
					<td>
						{new Date(job[1].AppliedDate).getDate()}/
						{new Date(job[1].AppliedDate).getMonth() + 1}/
						{new Date(job[1].AppliedDate).getFullYear()}
					</td>
					<td>{job[1].JobStatus}</td>
				</tr>
			);
		});

	if (isLoggedin) {
		if (localStorage.getItem("type") === "Company")
			return <Redirect to='/CompanyHome' />;
	} else if (!isLoggedin) {
		return <Redirect to='/Login'></Redirect>;
	}
	const DistinctStatus = Object.entries(jobs)
		.map(function (x) {
			return x[1].JobStatus;
		})
		.filter(function test(val, ind, self) {
			return self.indexOf(val) === ind;
		});
	const JobStatusRender = DistinctStatus.map((JobStatus) => {
		return (
			<Dropdown.Item onClick={() => JobStatusFilter(JobStatus)}>
				{JobStatus}
			</Dropdown.Item>
		);
	});
	const JobStatusFilter = (JobStatus) => {
		let filtered = jobs.filter((e) => {
			debugger;
			return e.JobStatus === JobStatus;
		});

		setJobs(filtered);
	};
	const sortbyDate = (type) => {
		let sortedJobs = [...jobs];
		sortedJobs.sort(function (a, b) {
			if (type === "desc")
				return new Date(b.AppliedDate) - new Date(a.AppliedDate);
			else return new Date(a.AppliedDate) - new Date(b.AppliedDate);
		});
		setJobs(sortedJobs);
		console.log(sortedJobs);
	};

	return (
		<div>
			<NavBar />
			<div class='filters d-flex'>
				<DropdownButton id='dropdown-basic-button' title='Status'>
					<Dropdown.Item onClick={() => loadData()}>All</Dropdown.Item>
					{JobStatusRender}
				</DropdownButton>
			</div>
			<br />
			<table class='table table-hover'>
				<thead>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Job Profile</th>
						<th scope='col'>Company Name</th>
						<th scope='col'>Job Type</th>
						<th scope='col'>Posted Date</th>
						<th scope='col'>
							Applied Date &nbsp;
							<a
								onClick={() => sortbyDate("desc")}
								href="#"
								data-toggle='tooltip'
								title='Most Recent Applied first'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									fill='currentColor'
									class='bi bi-arrow-up'
									viewBox='0 0 16 16'>
									<path
										fill-rule='evenodd'
										d='M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z'
									/>
								</svg>
							</a>
							&nbsp;
							<a
								onClick={() => sortbyDate("asc")}
								data-toggle='tooltip'
								title='Least Recent Applied first'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									fill='currentColor'
									class='bi bi-arrow-down'
									viewBox='0 0 16 16'>
									<path
										fill-rule='evenodd'
										d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z'
									/>
								</svg>
							</a>
						</th>

						<th scope='col'>Status</th>
					</tr>
				</thead>
				<tbody>{displayJobs}</tbody>
			</table>
			<ReactPaginate
				previousLabel={"Previous"}
				nextLabel={"Next"}
				pageCount={pageCount}
				onPageChange={changePage}
				containerClassName={"paginationBttns"}
				previousLinkClassName={"previousBttn"}
				nextLinkClassName={"nextBttn"}
				disabledClassName={"paginationDisabled"}
				activeClassName={"paginationActive"}
			/>
		</div>
	);
};

export default AppliedJobs;
