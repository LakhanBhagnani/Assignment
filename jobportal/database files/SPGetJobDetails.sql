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
CREATE OR ALTER PROCEDURE SPGetJobDetails 
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT J.[JOB_ID]
      ,J.[JobRole]
      ,J.[JobDescription]
      ,J.[JobType]
	  ,C.[CompanyName]
      ,J.[JobLocation]
      ,J.[SalaryMinimum]
      ,J.[SalaryMaximum]
      ,J.[RequiredExperience]
      ,J.[RequiredSkills]
	  ,J.[RequiredQualification]
	  ,JP.[PostingDate]
  FROM [JOBTB] AS J
  INNER JOIN JobPosting_R AS JP 
  ON JP.JOB_ID_FK =J.JOB_ID AND JP.IsActive=1
  INNER JOIN COMPANYTB AS C
  ON C.COMPANY_ID = JP.COMPANY_ID_FK



END
GO
