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
CREATE  or alter PROCEDURE SPJobPostedByCompany
	-- Add the parameters for the stored procedure here
	@username varchar (255)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select J.JobRole,J.JobType,j.JobLocation,jp.PostingDate, COUNT(J.job_ID) as candidates
from JOBTB as j 
inner join JobPosting_R as jp
on jp.JOB_ID_FK=J.JOB_ID
inner join HasApplied_R as h
on h.JOB_ID_FK=j.JOB_ID
inner join COMPANYTB as c
on c.Username=@username
group by j.JOB_ID,J.JobRole,J.JobType,j.JobLocation,jp.PostingDate
END
GO
