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
CREATE  OR ALTER PROCEDURE SPCheckUserHasApplied
	-- Add the parameters for the stored procedure here
	@JobID Bigint,
	@UserID BigInt
AS 
DECLARE @hasApplied BIT
BEGIN TRAN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @applicationId BIGINT
	
SET @applicationId = (	SELECT H.APPLICATION_ID
	FROM HasApplied_R as H
	WHERE H.CANDIDATE_ID_FK=@UserID
	AND H.JOB_ID_FK=@JobID)
	
	IF @applicationId IS NOT NULL
          SET @hasApplied=1;  
	ELSE  
           SET @hasApplied=0; 
COMMIT TRAN 
RETURN  @hasApplied

