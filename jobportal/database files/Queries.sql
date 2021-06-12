/*Query to retrive the name of companies Candidates have applied 
USE DB_JOB_PORTAL
Select COMPANYTB.CompanyName
from COMPANYTB
where COMPANYTB.COMPANY_ID in(
Select Distinct JOBPOSTING_R.COMPANY_ID_FK
from JOBTB, JOBPOSTING_R
where JOBPOSTING_R.JOB_ID_FK in
(
Select HASAPPLIED_R.JOB_ID_FK
from CANDIDATETB,HASAPPLIED_R
where CANDIDATETB.CANDIDATE_ID=HASAPPLIED_R.CANDIDATE_ID_FK
and CANDIDATETB.FirstName like 'Sharda'
)
)
*/

/*Retrive the names of candidates applied for the JOBTB posted by COMPANYTB
USE DB_JOB_PORTAL
select CANDIDATETB.FirstName
from CANDIDATETB
where CANDIDATETB.CANDIDATE_ID in(
Select HASAPPLIED_R.CANDIDATE_ID_FK
from HASAPPLIED_R
Where HASAPPLIED_R.JOB_ID_FK in
(select JOBPOSTING_R.JOB_ID_FK
from COMPANYTB, JOBPOSTING_R
where COMPANYTB.COMPANY_ID=JOBPOSTING_R.COMPANY_ID_FK
and COMPANYTB.CompanyName like 'MAQ')
)
*/ 
/* ACTIVE Jobs by Qualification
USE DB_JOB_PORTAL
SELECT J.JobRole,J.JobDescription,J.JobType,J.JobLocation,J.RequiredQualification,J.RequiredExperience,J.RequiredSkills,J.SalaryMaximum,J.SalaryMinimum
FROM CANDIDATETB
INNER JOIN JOBTB as J
ON CANDIDATETB.Qualification=J.RequiredQualification and CANDIDATETB.FirstName='Deepak'
INNER JOIN JOBPOSTING_R
ON J.JOB_ID=JOBPOSTING_R.JOB_ID_FK and JOBPOSTING_R.IsActive=1*/

--JOBS POSTED BY COMPANYTB
/*USE DB_JOB_PORTAL
SELECT C.CompanyName,JobRole,J.JobDescription,J.JobType,J.JobLocation,J.RequiredQualification,J.RequiredExperience,J.RequiredSkills,J.SalaryMaximum,J.SalaryMinimum, JP.PostingDate, JP.IsActive
FROM JOBTB AS J
INNER JOIN JOBPOSTING_R AS JP
ON J.JOB_ID=JP.JOB_ID_FK
INNER JOIN COMPANYTB AS C
ON C.COMPANY_ID=JP.COMPANY_ID_FK AND C.CompanyName='MAQ'*/



