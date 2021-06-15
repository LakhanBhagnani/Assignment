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
CREATE  OR ALTER PROCEDURE SPAddJob
	-- Add the parameters for the stored procedure here
			(
			@C_ID int,
            @JobRole varchar(255),
            @Description varchar(500),
            @Type varchar(255),
            @Location varchar(255),
            @MinimumSalary BIGINT,
            @MaximumSalary BIGINT,
			@RequiredQualification varchar(255),
            @RequiredSkills varchar(255),
            @RequiredExperience INT,
            @PostingDate Date
			)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[JOBTB]
           ([JobRole]
           ,[JobDescription]
           ,[JobType]
           ,[JobLocation]
           ,[SalaryMinimum]
           ,[SalaryMaximum]
           ,[RequiredExperience]
           ,[RequiredSkills]
		   ,[RequiredQualification])
     VALUES
           (@JobRole 
           ,@Description 
           ,@Type
           ,@Location
           ,@MinimumSalary
           ,@MaximumSalary 
           ,@RequiredExperience
           ,@RequiredSkills
		   ,@RequiredQualification
		   )

	DECLARE @Job_ID INT = SCOPE_IDENTITY()

	INSERT INTO [dbo].[JobPosting_R]
           ([JOB_ID_FK]
           ,[COMPANY_ID_FK]
           ,[IsActive]
           ,[PostingDate])
     VALUES
           (@Job_ID
           ,@C_ID
           ,1
           ,@PostingDate)
END
GO
