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
CREATE PROCEDURE SPAddCompany
	-- Add the parameters for the stored procedure here 
			(@CompanyName varchar(255)
           ,@RecruiterName varchar(255)
           ,@RecruiterEmailID varchar(255)
           ,@FoundDate date
           ,@CompanyDescription varchar(500)
           ,@CompanyLocation varchar(255)
           ,@Username varchar(255)
           ,@UserPassword varchar(255))
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO [dbo].[COMPANYTB]
           ([CompanyName]
           ,[RecruiterName]
           ,[RecruiterEmailID]
           ,[FoundDate]
           ,[CompanyDescription]
           ,[CompanyLocation]
           ,[Username]
           ,[UserPassword])
     VALUES
           (@CompanyName
           ,@RecruiterName
           ,@RecruiterEmailID
           ,@FoundDate
           ,@CompanyDescription
           ,@CompanyLocation
           ,@Username
           ,@UserPassword)
END
GO
