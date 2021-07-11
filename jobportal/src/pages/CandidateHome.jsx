import axios from "axios";
import React, {  useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../component/NavBar";
import ReactPaginate from "react-paginate";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
const CandidateHome = () => {
  const [jobs, setJobs] = useState({});
  const [hasApplied, setApplied] = useState(false);
  const [userdetails] = useState(
    JSON.parse(localStorage.getItem("UserDetails"))
  );
  const [isLoggedin] = useState(
    localStorage.getItem("token") == null ? false : true
  );
  const [pageNumber, setPagenumber] = useState(0);
  const Jobsperpage = 2;
  const pageVisited = pageNumber * Jobsperpage;
  const pageCount = Math.ceil(jobs.length / Jobsperpage);

  const changePage = ({ selected }) => {
    setPagenumber(selected);
  };
  const ApplyNow = (value) => {
    let userId = userdetails.CANDIDATE_ID;
    let appliedDate = new Date();
    let obj = {
      value,
      userId,
      appliedDate,
    };
    axios.post("http://localhost:3001/api/applyNow/", obj).then((response) => {
      if (response) {
        console.log(response);
        setApplied(true);
      }
    });
  };


  const displayJobs = Object.entries(jobs)
    .slice(pageVisited, pageVisited + Jobsperpage)
    .map((job) => {
      return (
        <li>
          <div
            className='container mt-2 bg-light border-dark'
            id={job[1].JOB_ID}
            key={job[1].JOB_ID}
          >
            <div className='d-flex '>
              <div className='p-1'>{job[1].JobRole}</div>
              <div className='p-1 mr-auto'>({job[1].JobType})</div>
              <div className='p-1'>{job[1].CompanyName},</div>
              <div className='p-1'>{job[1].JobLocation}</div>
            </div>
            <div className='d-flex p-2'>
              Job Description: <br />
              {job[1].JobDescription}
            </div>
            <div className='d-flex p-1'>
              <div className='flex-row'>
                <div className='order-3 p-1'>Experience</div>
                <div className='order-2 p-1'>
                  {job[1].RequiredExperience}+
                  {parseInt(job[1].RequiredExperience) > 1 ? " Years" : " Year"}
                </div>
              </div>
              <div className='flex-row mr-auto'>
                <div className='order-2 p-1'>Qualification</div>
                <div className='order-3 p-1'>
                  {job[1].RequiredQualification}
                </div>
              </div>
              <div className='flex-row'>
                <div className='order-2 p-2'>Job Posted on</div>
                <div className='order-3 p-1'>
                  {new Date(job[1].PostingDate).getDate()}/
                  {new Date(job[1].PostingDate).getMonth() + 1}/
                  {new Date(job[1].PostingDate).getFullYear()}
                </div>
              </div>
              {job[1].APPLICATION_ID ? (
                <>
                  <button
                    type='button'
                    class='btn btn-success float-right appbtn'
                  >
                    Applied{" "}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type='button'
                    class='btn btn-info float-right appbtn'
                    data-dismiss='alert'
                    onClick={() => ApplyNow(job[1].JOB_ID)}
                  >
                    Apply Now
                  </button>
                </>
              )}
            </div>
          </div>
        </li>
      );
    });
  const loadData = () => {
    let userId = userdetails.CANDIDATE_ID;
    fetch("http://localhost:3001/api/Alljobs/"+userId)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.recordset);
      });
  };
  useEffect(() => {
    loadData();
  }, [jobs]);

  if (hasApplied) {
    return <Redirect to='/jobsApplied' />;
  }
  if (isLoggedin) {
    if (localStorage.getItem("type") === "Company")
      return <Redirect to='/CompanyHome' />;
  } else if (!isLoggedin) {
    return <Redirect to='/Login'></Redirect>;
  }
  const distinctQualifications = Object.entries(jobs)
    .map(function (x) {
      return x[1].RequiredQualification;
    })
    .filter(function test(val, ind, self) {
      return self.indexOf(val) === ind;
    });

  const QualificationRender = distinctQualifications.map((Qualification) => {
    return (
      <Dropdown.Item onClick={() => QualificationFilter(Qualification)}>
        {Qualification}
      </Dropdown.Item>
    );
  });
  const QualificationFilter = (RequiredQualification) => {
    let filtered = jobs.filter((e) => {
      return e.RequiredQualification === RequiredQualification;
    });
    setJobs(filtered);
  };
  const distinctLocations = Object.entries(jobs)
    .map(function (x) {
      return x[1].JobLocation;
    })
    .filter(function test(val, ind, self) {
      return self.indexOf(val) === ind;
    });
  const LocationRender = distinctLocations.map((JobLocation) => {
    return (
      <Dropdown.Item onClick={() => JobLocationFilter(JobLocation)}>
        {JobLocation}
      </Dropdown.Item>
    );
  });
  const JobLocationFilter = (JobLocation) => {
    let filtered = jobs.filter((e) => {
      return e.JobLocation === JobLocation;
    });
    setJobs(filtered);
  };

  const DistinctJobType = Object.entries(jobs)
    .map(function (x) {
      return x[1].JobType;
    })
    .filter(function test(val, ind, self) {
      return self.indexOf(val) === ind;
    });
  const JobTypeRender = DistinctJobType.map((JobType) => {
    return (
      <Dropdown.Item onClick={() => JobTypeFilter(JobType)}>
        {JobType}
      </Dropdown.Item>
    );
  });
  const JobTypeFilter = (JobType) => {
    let filtered = jobs.filter((e) => {
      return e.JobType === JobType;
    });
    setJobs(filtered);
  };

  return (
    <div>
      <NavBar />
      <div class='filters d-flex'>
        <DropdownButton id='dropdown-basic-button' title='Qualification'>
          <Dropdown.Item onClick={() => loadData()}>All</Dropdown.Item>
          {QualificationRender}
        </DropdownButton>
        <DropdownButton id='dropdown-basic-button' title='Location'>
          <Dropdown.Item onClick={() => loadData()}>All</Dropdown.Item>
          {LocationRender}
        </DropdownButton>
        <DropdownButton id='dropdown-basic-button' title='Job Type'>
          <Dropdown.Item onClick={() => loadData()}>All</Dropdown.Item>
          {JobTypeRender}
        </DropdownButton>
      </div>

      <ul type='none'>{displayJobs}</ul>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default CandidateHome;
