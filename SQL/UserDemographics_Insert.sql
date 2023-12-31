USE [Fairly]
GO
/****** Object:  StoredProcedure [dbo].[UserDemographics_Insert]    Script Date: 7/21/2023 8:41:42 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Abraham Figueroa
-- Create Date: 06/20/2023
-- Description: Insert
-- Code Reviewer: Khac Tri Nguyen
-- =============================================

  ALTER proc [dbo].[UserDemographics_Insert]
					@PreferredName nvarchar(100)
				   ,@Pronunciation nvarchar(100)
				   ,@AboutMe nvarchar(100)
				   ,@GenderId int
				   ,@UserId int
				   ,@Id int OUTPUT 

/*
  Execute dbo.UserDemographics_Insert
				    @PreferredName = 'Mori'
				   ,@Pronunciation ='More- e'
				   ,@AboutMe ='Testing'
				   ,@GenderId = 2
				   ,@UserId = 3  
				   ,@Id OUTPUT

	Select *
	From dbo.UserDemographics

	select *
	From dbo.Users
*/
As
Begin

INSERT INTO [dbo].[UserDemographics]
				   (PreferredName
				   ,Pronunciation
				   ,AboutMe
				   ,GenderId
				   ,UserId
				   ,DateCreated
				   ,DateModified)

			 VALUES
				   (@PreferredName
				   ,@Pronunciation
				   ,@AboutMe
				   ,@GenderId
				   ,@UserId
				   ,GETUTCDATE()
				   ,GETUTCDATE());

				   SET @Id = SCOPE_IDENTITY();
End


