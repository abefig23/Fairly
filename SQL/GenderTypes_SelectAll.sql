USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[GenderTypes_SelectAll]    Script Date: 7/24/2023 4:57:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Abraham Figueroa
-- Create Date: 06/20/2023
-- Description: Look up table Only 4 options 0-4 , DO NOT CHANGE.
-- =============================================

ALTER proc [dbo].[GenderTypes_SelectAll]

/*

 Execute dbo.GenderTypes_SelectAll  

*/

AS
Begin

		Select *
		From     dbo.GenderTypes

End