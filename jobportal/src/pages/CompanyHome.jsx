import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../component/NavBar";
const CompanyHome = () => {
  const [jobs, setjobs] = useState({});
  const [isLoggedin, setLogg] = useState(
    localStorage.getItem("token") == null ? false : true
  );

  const [pageNumber, setPagenumber] = useState(0);
  const Jobsperpage = 10;
  const pageVisited = pageNumber * Jobsperpage;
  const pageCount = Math.ceil(jobs.length / Jobsperpage);

  useEffect(() => {
    if (isLoggedin) {
      if (localStorage.getItem("type") == "Candidate")
        return <Redirect to='/CandidateHome' />;
      let url =
        "http://localhost:3001/api/getJobsPostedByCompany/" +
        localStorage.getItem("token");
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setjobs(data.recordset);
        });
    }
    if (!isLoggedin) {
      return <Redirect to='/Login'></Redirect>;
    }
  }, []);
  const jobremove = () => {
    let answer = window.confirm("You sure want to delete this job?");
    console.log(answer);
  };
  const displayJobs = Object.entries(jobs)
    .slice(pageVisited, pageVisited + Jobsperpage)
    .map((job, index) => {
      return (
        <li>
          <div className='container mt-3 bg-light border-dark'>
            <div className='d-flex p-1'>
              <div className='jobs p-1'>
                <h4>{job[1].JobRole}</h4>
              </div>
              <div className='jobs p-1 mr-auto'>
                <h4>{job[1].JobType}</h4>
              </div>
              <div className='jobs p-1'>
                <h4>{job[1].JobLocation}</h4>
              </div>
              <div className='icon'>
                <button
                  type='button'
                  onClick={() => jobremove}
                  className='close'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
            </div>

            <div className='d-flex p-1'>
              <div className='jobs p-1'>
                <h5>Job Posted on</h5>
              </div>
              <div className='jobs p-1 mr-auto'>
                <h5>
                  {new Date(job[1].PostingDate).getDate()}/
                  {new Date(job[1].PostingDate).getMonth()}/
                  {new Date(job[1].PostingDate).getFullYear()}
                </h5>
              </div>

              <div className='jobs p-2'>
                <h5>No of Applicants</h5>
              </div>
              <div className='jobs p-1'>
                <h5>{job[1].candidates}</h5>
              </div>
            </div>
          </div>
        </li>
      );
    });

  return (
    <>
      <NavBar />
      <ul type='none'>{displayJobs}</ul>
    </>
  );
};

export default CompanyHome;
