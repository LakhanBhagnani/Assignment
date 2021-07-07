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
CREATE OR ALTER PROCEDURE SPArchiveJob
	-- Add the parameters for the stored procedure here
	@JOB_ID INT 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE JobPosting_R
	SET IsActive=0
	WHERE JobPosting_R.JOB_ID_FK=@JOB_ID

	UPDATE HasApplied_R
	SET JobStatus='Position Fullfilled'
	WHERE HasApplied_R.JOB_ID_FK=@JOB_ID
END
GO
