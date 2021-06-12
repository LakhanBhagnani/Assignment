import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import NavBar from "../component/NavBar";
const Login = () => {
	const [Username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [usertype, setuserType] = useState();
	const [isLoggedIn, setLogg] = useState(
		localStorage.getItem("token") == null ? false : true
	);

	const submitHandle = async (e) => {
		e.preventDefault();
		let apiurl = "";
		if (usertype == "Company") {
			apiurl = "getCompanyDetails/" + Username;
		} else {
			apiurl = "getCandidateDetails/" + Username;
		}
		let url = "http://localhost:3001/api/" + apiurl;
		let headers = {
			headers: {
				"access-control-allow-origin": "http://localhost:3001/",
				withCredentials: true,
			},
		};
		axios.get(url, headers).then((response) => {
			console.log("resonse is generated");
			let result = response.data.recordset[0];
			if (result !== undefined) {
				const comparision =
					password.toLowerCase().trim() ===
					result.UserPassword.toLowerCase().trim();
				if (comparision) {
					let token = result.Username;
					localStorage.setItem("token", token);
					localStorage.setItem("type", usertype);
					localStorage.setItem("UserDetails", JSON.stringify(result));
					setLogg(true);
				} else {
					alert("username and password doesn't match");
				}
			} else {
				alert("no username found");
			}
		});
	};

	if (isLoggedIn) {
		if (usertype == "Candidate") return <Redirect to='/CandidateHome' />;
		else return <Redirect to='/CompanyHome' />;
	}

	const onChangeValue = (event) => {
		setuserType(event.target.value);
	};

	return (
		<>
			<NavBar />
			<main className='form-signin'>
				<form onSubmit={submitHandle}>
					<h1 className='h3 mb-3 fw-normal'>Please Login in</h1>

					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingInput'
							onChange={(e) => setUsername(e.target.value)}
						/>
						<label for='floatingInput'>Username</label>
					</div>
					<div className='form-floating'>
						<input
							type='password'
							className='form-control'
							id='floatingPassword'
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label for='floatingPassword'>Password</label>
					</div>

					<div onChange={onChangeValue}>
						<input
							className='form-check-input'
							type='radio'
							value='Company'
							name='gender'
						/>
						Company
						<div></div>
						<input
							className='form-check-input'
							type='radio'
							value='Candidate'
							name='gender'
						/>
						Candidate
					</div>
					<button className='w-100 btn btn-lg btn-primary' type='submit'>
						Login
					</button>
					<p className='mt-5 mb-3 text-muted'>&copy; 2021</p>
				</form>
			</main>
		</>
	);
};

export default Login;
