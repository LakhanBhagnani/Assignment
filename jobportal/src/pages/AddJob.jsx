import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import NavBar from "../component/NavBar";
const AddJob = () => {
	const [JobRole, setJobRole] = useState();
	const [Description, setDescription] = useState();
    const [Type,setSType]=useState("Full-Time");
	const[Location,setLocation]=useState();
	const[MinimumSalary,setMinimumSalary]=useState();
	const[MaximumSalary,setMaximumSalary]=useState();
    const [RequiredQualification, setRequiredQualification]=useState();
	const [RequiredSkills, setRequiredSkills]=useState();
	const [RequiredExperience, setRequiredExperience]=useState();
    const [redirect,setRedirect]=useState();
	const [isLoggedin, setLogg] = useState(
		localStorage.getItem("token") == null ? false : true
	);
	const CompanyDetails=JSON.parse(localStorage.getItem("UserDetails"));

	const SubmitHandle = (e) => {
		e.preventDefault();
		var jobObj = {
            C_ID:CompanyDetails.COMPANY_ID,
            JobRole,
            Description,
            Type,
            Location,
            MinimumSalary,
            MaximumSalary,
            RequiredQualification,
            RequiredSkills,
            RequiredExperience,
            PostingDate: new Date()
		
		};
        console.log(jobObj);
		axios
			.post("http://localhost:3001/api/addJob/", jobObj)
			.then((response) => {
				if (response) {
					console.log(response);
					setRedirect(true);
				}
			});
	};
 if (redirect) {
	   debugger;
	   return <Redirect to='/Login' />;
}
var setType=(e)=>{
    let index=e.selectedIndex;
    let value=e.options[index].innerHTML;
    setSType(value);
}
	
	
	return (
		<>
			<NavBar />
            <main className='form-signin'>
				<form onSubmit={SubmitHandle}>
					<h1 className='h3 mb-3 fw-normal'>New Job Details</h1>

					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='floatingInput'
							placeholder='Job Role'
							onChange={(e) => setJobRole(e.target.value)}
							required
						/>

					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							placeholder='Description (minimum 300 words)'
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</div>
                    <div className='form-floating'>
                        <select name="Type" className='form-control' onChange={(e)=>setType(e.target)} >
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract Based">Contract Based</option>
                        </select>
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							placeholder='Location'
							onChange={(e) => setLocation(e.target.value)}
							required
						/>
			
					</div>
					
					<div className='form-floating'>
						<input
							type='number'
							className='form-control'
							placeholder='Minimum Salary per annum'
							min='100000'
							onChange={(e) => setMinimumSalary(e.target.value)}
							required
						/>
		
					</div>
					<div className='form-floating'>
						<input
							type='number'
							className='form-control'
							placeholder='Maximum Salary per annum'
							min='100000'
							onChange={(e) => setMaximumSalary(e.target.value)}
							required
						/>
			
					</div>
                    <div className='form-floating'>
						<input
							type='text'
							className='form-control'
							placeholder='Required Qualification'
							onChange={(e) => setRequiredQualification(e.target.value)}
							required
						/>
					
					</div>
					<div className='form-floating'>
						<input
							type='number'
							className='form-control'
							placeholder='Required Experience'
							min='0'
							onChange={(e) => setRequiredExperience(e.target.value)}
							required
						/>
					
					</div>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							placeholder='Required Skills'
							onChange={(e) => setRequiredSkills(e.target.value)}
							required
						/>
					</div>
			
					<button className='w-100 btn btn-lg btn-primary' type='submit'>
						Add
					</button>
					<p className='mt-5 mb-3 text-muted'>&copy; 2021</p>
				</form>
			</main>
			</>
	);
};

export default AddJob;
