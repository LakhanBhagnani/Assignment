import React, { useState } from "react";
import NavBar from "../component/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
const Home = () => {
	const [isLoggedin, setLogg] = useState(
		localStorage.getItem("token") == null ? false : true
	);
	if (isLoggedin) {
		if (localStorage.getItem("type") == "Candidate")
			return <Redirect to='/CandidateHome' />;
		else return <Redirect to='/CompanyHome' />;
	}

	return (
		<>
			<NavBar />
			<div>
				<div class='HomePageBox'>
					<h2>Are you a recuiter? </h2>
					<h3>Looking for candidates?</h3>
					<h3>Register below by clicking the button</h3>
					<Link to='/companyregister' type='button' class='btn btn-primary'>
						Company Register
					</Link>
				</div>
				<div class='HomePageBox'>
					<h2>Worried about future?</h2>
					<h3>Looking for Job?</h3>
					<h3>Register below by clicking the button</h3>
					<Link to='/candidateregister' type='button' class='btn btn-primary'>
						Candidate Register
					</Link>
				</div>
			</div>
		</>
	);
};

export default Home;
