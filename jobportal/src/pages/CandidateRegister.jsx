import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import NavBar from "../component/NavBar";
const CandidateRegister = () => {
	const [email, setEmail] = useState();
	const [Fname, setFname] = useState();
	const [LName, setLName] = useState();
	const [Username, setUsername] = useState();
	const [Password, setPassword] = useState();
	const [CPassword, setCPassword] = useState();
	const [DOB, setDOB] = useState();
	const [Qualification, setQualification] = useState();
	const [PassingDate, setPassingDate] = useState();
	const [CurrentCity, setCurrentCity] = useState();
	const [Skills, setSkills] = useState();
	const [Experience, setExperience] = useState();
	const [redirect, setRedirect] = useState(false);
	const [isLoggedin, setLogg] = useState(
		localStorage.getItem("token") == null ? false : true
	);
	if (isLoggedin) {
		 if (localStorage.getItem("type") == "Candidate")
			return <Redirect to='/CandidateHome' />;
		else return <Redirect to='/CompanyHome' />;
	}
	else if (redirect) {
		return <Redirect to='/Login' />;
	}

	const SubmitHandle = (e) => {
		e.preventDefault();
		var userObj = {
			email,
			Fname,
			LName,
			Username,
			Password,
			DOB,
			Qualification,
			PassingDate,
			CurrentCity,
			Skills,
			Experience,
		};
		axios
			.post("http://localhost:3001/api/registerCandidate/", userObj)
			.then((response) => {
				if (response) {
					console.log(response);
					setRedirect(true);
				}
			});
	};

	

	return (
		<>
			<NavBar />
			<main className='form-signin'>
				<form onSubmit={SubmitHandle}>
					<h1 className='h3 mb-3 fw-normal'>Candidate Registeration</h1>

					<div className='form-floating'>
						<input
							type='email'
							className='form-control'
							id='floatingInput'
							placeholder='name@example.com'
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label for='floatingInput'>Email</label>
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='First Name'
							onChange={(e) => setFname(e.target.value)}
						/>
						<label for='floatingPassword'>First Name</label>
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='Password'
							onChange={(e) => setLName(e.target.value)}
						/>
						<label for='floatingPassword'>Last Name</label>
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='Password'
							onChange={(e) => setUsername(e.target.value)}
						/>
						<label for='floatingPassword'>Username</label>
					</div>
					<div className='form-floating'>
						<input
							type='password'
							className='form-control'
							id='floatingPassword'
							placeholder='Password'
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label for='floatingPassword'>Password</label>
					</div>
					<div className='form-floating'>
						<input
							type='password'
							className='form-control'
							id='floatingPassword'
							placeholder='Password'
							onChange={(e) => setCPassword(e.target.value)}
						/>
						<label for='floatingPassword'>Confirm Password</label>
					</div>
					<div className='form-floating'>
						<input
							type='date'
							className='form-control'
							id='floatingPassword'
							placeholder='Password'
							onChange={(e) => setDOB(e.target.value)}
						/>
						<label for='floatingPassword'>Date of Birth</label>
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='Password'
							onChange={(e) => setQualification(e.target.value)}
						/>
						<label for='floatingPassword'>Qualification</label>
					</div>
					<div className='form-floating'>
						<input
							type='date'
							className='form-control'
							id='floatingPassword'
							placeholder='Password'
							onChange={(e) => setPassingDate(e.target.value)}
						/>
						<label for='floatingPassword'>Passing date</label>
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='Password'
							onChange={(e) => setCurrentCity(e.target.value)}
						/>
						<label for='floatingPassword'>Current City</label>
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='Password'
							onChange={(e) => setSkills(e.target.value)}
						/>
						<label for='floatingPassword'>Skills</label>
					</div>
					<div className='form-floating'>
						<input
							type='number'
							className='form-control'
							id='floatingPassword'
							placeholder='Password'
							min='0'
							onChange={(e) => setExperience(e.target.value)}
						/>
						<label for='floatingPassword'>Experience</label>
					</div>
					<button className='w-100 btn btn-lg btn-primary' type='submit'>
						Register
					</button>
					<p className='mt-5 mb-3 text-muted'>&copy; 2021</p>
				</form>
			</main>
		</>
	);
};

export default CandidateRegister;
