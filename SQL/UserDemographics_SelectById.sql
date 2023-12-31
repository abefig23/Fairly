USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[UserDemographics_SelectById]    Script Date: 7/21/2023 8:42:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Abraham Figueroa
-- Create Date: 06/20/2023
-- Description:  Select for User Demographics
-- Code Reviewer: Khac Tri Nguyen
-- =============================================
ALTER proc [dbo].[UserDemographics_SelectById]
 				   @Id int

/*
  Execute dbo.UserDemographics_SelectById
				  
				   @Id = 4

*/
As
Begin

             Select		
				    PreferredName
				   ,Pronunciation
				   ,AboutMe
				   ,GenderId
				   ,ud.Id 
				   ,ud.DateCreated
				   ,ud.DateModified

		From [dbo].[UserDemographics] as ud
					inner join dbo.Users as u
						on u.Id = ud.userId

		Where ud.Id = @Id 

End
