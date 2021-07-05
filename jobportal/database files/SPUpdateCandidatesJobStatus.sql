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
CREATE OR ALTER PROCEDURE SPUpdateCandidatesJobStatus 
	-- Add the parameters for the stored procedure here
	@NewStatus varchar(20)='Applied',
	@JobID Bigint,
	@UserID BigInt

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE [dbo].[HasApplied_R]
   SET  [JobStatus] = @NewStatus
 WHERE [CANDIDATE_ID_FK] = @UserID and [JOB_ID_FK] = @JobID
           
	
END
GO
