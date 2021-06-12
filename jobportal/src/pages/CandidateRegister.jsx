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

	const checkpassword=(pwd)=>{
		if(pwd==Password)
			{setPassword(pwd)
				document.getElementById('passwordSpan').innerHTML=""}
		else
		{
			debugger;
			document.getElementById('passwordSpan').innerHTML="Password doesn't match";
			document.getElementById('passwordSpan').classList.add("myspans");
		}
	}
	const checkConstraints=(passwd)=>{
		let ele=document.getElementById("passwordConstraints");
		let lowerCaseLetters = /[a-z]/g;
		let upperCaseLetters=/[A-Z]/g;
		let Numbers=/[0-9]/g;
		let specialChars=/[$,@,#]/g
		let isValid= true;
		if(passwd.length<8){
			ele.innerHTML="length must be greater than 8";
			isValid=false
		}else
		if(passwd.match(lowerCaseLetters)==null){
			ele.innerHTML="Password should contains small letters"
			isValid=false
		}else
		if(passwd.match(upperCaseLetters)==null){
			ele.innerHTML="Password should contains Capitals letters"
			isValid=false
		}else
		 if(passwd.match(Numbers)==null){
			ele.innerHTML="Password should contains Numbers"
			isValid=false
		}else
		if(passwd.match(specialChars)==null){
			ele.innerHTML="Password should contains special like #,@,$"
			isValid=false
		}else
		if(isValid)
		{
			ele.innerHTML=""
			setPassword(passwd);
		}
		else{
			ele.classList.add("myspans");
		}
		
		

	}

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
							placeholder='Email-ID'
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='First Name'
							onChange={(e) => setFname(e.target.value)}
							required
						/>

					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='Last Name'
							onChange={(e) => setLName(e.target.value)}
							required
						/>
			
					</div>
					
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='Date of Birth'
							onFocus={(e)=>e.target.type='date'}
							onChange={(e) => setDOB(e.target.value)}
							required
						/>
		
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='Qualification'
							onChange={(e) => setQualification(e.target.value)}
							required
						/>
			
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='Passing Date'
							onFocus={(e)=>e.target.type='date'}
							onChange={(e) => setPassingDate(e.target.value)}
							required
						/>
					
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='Current City'
							onChange={(e) => setCurrentCity(e.target.value)}
							required
						/>
				
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='Skills(comma separated)'
							onChange={(e) => setSkills(e.target.value)}
							required
						/>
				
					</div>
					<div className='form-floating'>
						<input
							type='number'
							className='form-control'
							id='floatingPassword'
							placeholder='Experience in Years'
							min='0'
							onChange={(e) => setExperience(e.target.value)}
							required
						/>
					
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='Username'
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
	
					</div>
					<div className='form-floating'>
						<input
							type='password'
							className='form-control'
							id='floatingPassword'
							placeholder='Password'
							pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
							onChange={(e) => checkConstraints(e.target.value)}
							required
						/><span class="myspans" id="passwordConstraints"></span>
					</div>
					<div className='form-floating'>
						<input
							type='password'
							className='form-control'
							id='floatingPassword'
							placeholder='Confirm Password'
							onChange={(e) => checkpassword(e.target.value)}
							required
						/>
						<span  id="passwordSpan"></span>
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
