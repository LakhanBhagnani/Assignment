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

  const getJobs=()=>{
     let url =
       "http://localhost:3001/api/getJobsPostedByCompany/" +
       localStorage.getItem("token");
     fetch(url)
       .then((response) => response.json())
       .then((data) => {
         setjobs(data.recordset);
       });
  }
  useEffect(() => {
    if (isLoggedin) {
      if (localStorage.getItem("type") == "Candidate")
        return <Redirect to='/CandidateHome' />;
     getJobs();
    }
    if (!isLoggedin) {
      return <Redirect to='/Login'></Redirect>;
    }
  }, []);
  const ArchiveJob = (j_id) => {
    let answer = window.confirm("You sure want to delete this job?");
    if (answer) {
      let url= "http://localhost:3001/api/archiveJob/"+j_id;
      fetch(url).then(
            window.alert("Job is archived successfully")
      ).then( getJobs())
    }
  };
    const UnarchiveJob = (j_id) => {
      let answer = window.confirm("You sure want to unarchive this job?");
      if (answer) {
        let url = "http://localhost:3001/api/UnarchiveJob/" + j_id;
        fetch(url)
          .then(window.alert("Job is Unarchived successfully"))
          .then(getJobs());
      }
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
                {job[1].IsActive ? (
                  <>
                    <button
                      type='button'
                      className='closebtn btn btn-danger'
                      data-toggle='tooltip'
                      title='Archive job?'
                      onClick={() => ArchiveJob(job[1].JOB_ID)}
                      aria-label='Close'
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type='button'
                      className='closebtn btn btn-success'
                      data-toggle='tooltip'
                      title='Unarchive job?'
                      onClick={() => UnarchiveJob(job[1].JOB_ID)}
                      aria-label='Close'
                    >
                      <span aria-hidden='true'>&#43;</span>
                    </button>
                  </>
                )}
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
