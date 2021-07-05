   USE DB_JOB_PORTAL
  SELECT * from CANDIDATETB
  select * from COMPANYTB
  SELECT * FROM JOBTB
  select * from JobPosting_R
  select * from HasApplied_R
  /*
  exec dbo.SPGetActiveJobsbyQualification 'Bcom'

  exec SPJobPostedByCompany 'MAQ1234'
  exec SPCandidatesForJob 'CGHARSHAD'

  exec SPCandidateAppliedJobs 'deepak1'

 SPUpdateCandidatesJobStatus 'Reviewed',1,1
 
 exec SPInsertJob 'Manager','Manager','Full-time','Delhi',1000000,1200000,15,'Management,Team Handle','MBA',2,1,'2021-06-08'
 exec SPJobApply @JOB_ID_FK=6,@CANDIDATE_ID_FK=2,@AppliedDate='2021-06-08'
 exec SPChangeJobsActiveStatus 3,2,0,NULL

 exec SPGetJobDetails
 delete from JobPosting_R where JOB_ID_FK IS NULL


 */

