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
CREATE PROCEDURE SPCandidatesForJob
	-- Add the parameters for the stored procedure here
	@Username varchar(255)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
Select cd.FirstName,cd.LastName,cd.CANDIDATE_ID,j.JobRole,a.JobStatus,j.JOB_ID
FROM COMPANYTB as c
INNER JOIN JobPosting_R as jp
ON c.COMPANY_ID=jp.COMPANY_ID_FK
INNER JOIN JOBTB as j
ON j.JOB_ID=jp.JOB_ID_FK
INNER JOIN HasApplied_R as a
ON a.JOB_ID_FK=jp.JOB_ID_FK
INNER JOIN CANDIDATETB as cd
ON cd.CANDIDATE_ID=a.CANDIDATE_ID_FK

END
GO
