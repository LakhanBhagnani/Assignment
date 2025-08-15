import React, { useState } from "react";
import NavBar from "../component/NavBar";
import {  Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
const Home = () => {
	const [isLoggedin] = useState(
		localStorage.getItem("token") == null ? false : true
	);
	if (isLoggedin) {
		if (localStorage.getItem("type") === "Candidate")
			return <Redirect to='/CandidateHome' />;
		else return <Redirect to='/CompanyHome' />;
	}

	return (
		<>
			<NavBar />
			<div>
					<h2> Something better</h2>
			</div>
		</>
	);
};

export default Home;
