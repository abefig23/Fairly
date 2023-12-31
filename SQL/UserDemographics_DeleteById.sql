USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[UserDemographics_DeleteById]    Script Date: 7/21/2023 8:40:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Abraham Figueroa
-- Create Date: 06/21/2023
-- Description: Deletes a record by the Id
-- Code Reviewer: Khac Tri Nguyen
-- =============================================

ALTER proc [dbo].[UserDemographics_DeleteById]
 				   @Id int

/*
  Execute dbo.UserDemographics_DeleteById
				  
				   @Id = 1
				
*/
As
Begin

		Delete From dbo.UserDemographics

		Where Id = @Id

End