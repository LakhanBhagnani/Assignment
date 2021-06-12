import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const NavBar = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
	};

	return (
		<nav className='navbar navbar-expand-md navbar-dark bg-dark mb-4'>
			<div className='container-fluid'>
				<Link to='/' className='navbar-brand mr-auto'>
					Home
				</Link>
				{localStorage.getItem("type") == "Candidate" ? (
					<>
						<Link className='navbar-brand nav-link active' to='/jobsApplied'>
							Applied Jobs
						</Link>
					</>
				):(<></>)}
				{localStorage.getItem("type") == "Company" ? (
					<>
						<Link className='navbar-brand  active' to='/applicants'>
							Applicants
						</Link>
					</>
				):(<></>)}
				<div>
					<ul className='navbar-nav me-auto mb-3 mb-md-0'>
						<li className='nav-item'>
							{localStorage.getItem("token") == null ? (
								<>
									<Link
										to='/login'
										className='nav-link active'
										aria-current='page'>
										LOGIN
									</Link>
								</>
							) : (
								<>
									<span className='nav-link active'>
										{localStorage.getItem("token").toLocaleUpperCase()}
									</span>
									<Link
										to='/login'
										className='nav-link active'
										aria-current='page'
										onClick={handleLogout}>
										LOGOUT
									</Link>
								</>
							)}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
