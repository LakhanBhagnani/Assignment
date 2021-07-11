import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import NavBar from "../component/NavBar";
const CompanyRegister = () => {
	const [CompanyName, setCompanyName] = useState();
	const [RecruiterName, setRecruiterName] = useState();
	const [RecruiterEmailID, setRecruiterEmailID] = useState();
	const [FoundDate, setFoundDate] = useState();
	const [CompanyDescription, setCompanyDescription] = useState();
	const [CompanyLocation, setCompanyLocation] = useState();
	const [Username, setUsername] = useState();
	const [UserPassword, setUserPassword] = useState();
	const [redirect, setRedirect] = useState(false);
	const [isLoggedin] = useState(
		localStorage.getItem("token") == null ? false : true
	);
	if (isLoggedin) {
		if (localStorage.getItem("type") === "Candidate")
			return <Redirect to='/CandidateHome' />;
	} else if (redirect) {
		return <Redirect to='/Login' />;
	}
	const checkpassword=(pwd)=>{
		if(pwd===UserPassword)
			{setUserPassword(pwd)
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
			setUserPassword(passwd);
		}
		else{
			ele.classList.add("myspans");
		}
		
		

	}

	const SubmitHandle = (event) => {
		event.preventDefault();
		let userObj = {
			CompanyName,
			RecruiterName,
			RecruiterEmailID,
			FoundDate,
			CompanyDescription,
			CompanyLocation,
			Username,
			UserPassword,
		};
		console.log(userObj);
		axios
			.post("http://localhost:3001/api/companyRegister/", userObj)
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
					<h1 className='h3 mb-3 fw-normal'>Company Registeration</h1>

					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingInput'
							placeholder='Company Name'
							onChange={(e) => setCompanyName(e.target.value)}
							required
						/>
						
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingInput'
							placeholder='Recruiter Name'
							onChange={(e) => setRecruiterName(e.target.value)}
							required
						/>
						
					</div>
					<div className='form-floating'>
						<input
							type='email'
							className='form-control'
							id='floatingInput'
							placeholder="Recruiter's Email ID"
							onChange={(e) => setRecruiterEmailID(e.target.value)}
							required
						/>

					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='Foundation Date'
							onFocus={(e)=>e.target.type='date'}
							onFocusOut={(e)=>e.target.type='text'}
							onChange={(e) => setFoundDate(e.target.value)}
							required
						/>
		
					</div>
					<div className='form-floating'>
						<input
							type='textarea'
							className='form-control'
							id='floatingPassword'
							placeholder='Company Description'
							onChange={(e) => setCompanyDescription(e.target.value)}
							required
						/>
			
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingPassword'
							placeholder='Company Location'
							onChange={(e) => setCompanyLocation(e.target.value)}
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

export default CompanyRegister;
