-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE OR ALTER PROCEDURE SPCandidateAppliedJobs
	-- Add the parameters for the stored procedure here
	@USERNAME VARCHAR(255)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
		SELECT COMPANYTB.CompanyName,JOBTB.JobRole,JOBTB.JobType,JobPosting_R.PostingDate,HasApplied_R.AppliedDate,HasApplied_R.JobStatus
		FROM CANDIDATETB
		INNER JOIN HASAPPLIED_R
		ON HASAPPLIED_R.CANDIDATE_ID_FK = CANDIDATETB.CANDIDATE_ID AND CANDIDATETB.Username LIKE 'lakhan'
		INNER JOIN JOBTB
		ON JOBTB.Job_ID=Hasapplied_r.JOB_ID_FK
		INNER JOIN JobPosting_R
		ON JobPosting_R.IsActive=1 and JobPosting_R.JOB_ID_FK=HasApplied_R.JOB_ID_FK 
		INNER JOIN COMPANYTB
		ON COMPANYTB.COMPANY_ID = JobPosting_R.COMPANY_ID_FK
END
GO
