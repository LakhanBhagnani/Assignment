import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import NavBar from "../component/NavBar";
const Login = () => {
	const [Username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [usertype, setUserType] = useState();
	const [isLoggedIn, setLogg] = useState(
		localStorage.getItem("token") == null ? false : true
	);

	const submitHandle = async (e) => {
		e.preventDefault();
		let apiurl = "";
		if (usertype === "Company") {
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
			let ele=document.getElementById("errorSpan");
			console.log("response is generated");
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
					ele.innerHTML="username and password doesn't match";
					ele.classList.add("myspans");
				}
			}
		}).catch((error) =>{
			let ele=document.getElementById("errorSpan");
			ele.innerHTML="No Username found";
				ele.classList.add("myspans");
		});
	};

	if (isLoggedIn) {
		if (usertype === "Candidate") return <Redirect to='/CandidateHome' />;
		else return <Redirect to='/CompanyHome' />;
	}

	return (
		<>
			<NavBar />
			<main className='form-signin'>
				<form onSubmit={submitHandle}>
				<span  id="errorSpan"></span>
					<h1 className='h3 mb-3 fw-normal'>Please Login in</h1>
					<div id="radiobuttons" >
						<input
							className='form-check-input'
							type='radio'
							value='Company'
							id="company"
							name='User'
							onChange={(e)=>setUserType(e.target.value)}
						/>
						<label for="company">Company</label>
						<div></div>
						<input
							className='form-check-input'
							type='radio'
							value='Candidate'
							id="candidate"
							name='User'
							onChange={(e)=>setUserType(e.target.value)}
							
						/>
						<label for="candidate">Candidate</label>
					</div>
					
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingInput'
							placeholder="Username"
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className='form-floating'>
						<input
							type='password'
							className='form-control'
							id='floatingPassword'
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<button className='mt-2 w-100 btn btn-lg btn-primary' type='submit'>
						Login
					</button>
					<p className='mt-5 mb-3 text-muted'>&copy; 2021</p>
				</form>
			</main>
		</>
	);
};

export default Login;
