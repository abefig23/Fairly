USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[UserDemographics_UpdateById]    Script Date: 7/21/2023 8:45:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Abraham Figueroa
-- Create Date: 06/21/2023
-- Description: Update
-- Code Reviewer: Khac Tri Nguyen
-- =============================================

  ALTER proc [dbo].[UserDemographics_UpdateById]
					@Id int
				   ,@PreferredName nvarchar(100)
				   ,@Pronunciation nvarchar(100)
				   ,@AboutMe nvarchar(100)
				   ,@GenderId int
				   ,@UserId int

/*
			Declare	@Id int = 3
				   ,@PreferredName nvarchar(100)= 'AnneD'
				   ,@Pronunciation nvarchar(100)= 'an-dee'
				   ,@AboutMe nvarchar(100)= 'cohort 126 graduated'
				   ,@GenderId int = 1
				   ,@UserId  int= 7

	 Execute dbo.UserDemographics_UpdateById
		            @Id
				   ,@PreferredName 
				   ,@Pronunciation 
				   ,@AboutMe 
				   ,@GenderId 
				   ,@UserId 
	Select*
	From dbo.UserDemographics
*/
As
Begin

			DECLARE @DateModified datetime2 = GETUTCDATE()

			Update [dbo].[UserDemographics]
			   
			 Set    PreferredName = @PreferredName
				   ,Pronunciation = @Pronunciation
				   ,AboutMe = @AboutMe
				   ,GenderId = @GenderId
				   ,UserId = @UserId
				   ,DateModified = GETUTCDATE()
		       From dbo.UserDemographics as ud
			        Inner Join dbo.Users As u 
			On u.Id = ud.UserId
		    Where ud.Id = @Id

End