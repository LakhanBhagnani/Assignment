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
CREATE PROCEDURE SPAddCandidate 
	-- Add the parameters for the stored procedure here
			(@CandidateEmailID varchar(255)
           ,@FirstName varchar(255)
           ,@LastName varchar(255)
           ,@Username varchar(255)
           ,@UserPassword varchar(255)
           ,@DateOfBirth date
           ,@Qualification varchar(255)
           ,@PassingYear date
           ,@CurrentCity varchar(255)
           ,@Skills varchar(255)
           ,@ExperienceInYears int)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[CANDIDATETB]
           ([CandidateEmailID]
           ,[FirstName]
           ,[LastName]
           ,[Username]
           ,[UserPassword]
           ,[DateOfBirth]
           ,[Qualification]
           ,[PassingYear]
           ,[CurrentCity]
           ,[Skills]
           ,[ExperienceInYears])
     VALUES
           (@CandidateEmailID
           ,@FirstName
           ,@LastName
           ,@Username
           ,@UserPassword
           ,@DateOfBirth
           ,@Qualification
           ,@PassingYear
           ,@CurrentCity
           ,@Skills
           ,@ExperienceInYears)

END
GO
