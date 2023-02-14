USE [master]

IF db_id('MadWrld') IS NULL
  CREATE DATABASE [MadWrld]
GO

USE [MadWrld]
GO

DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [MLTemplate];
DROP TABLE IF EXISTS [MadLib];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [CategoryTemplate];
DROP TABLE IF EXISTS [MLAnswerTemplate];
GO


CREATE TABLE [UserType] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Name] NVARCHAR(50) NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [UserTypeId] INTEGER NOT NULL
)
GO

CREATE TABLE [MLTemplate] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Title] nvarchar(255) NOT NULL,
  [UserId] int NOT NULL
)
GO

CREATE TABLE [MadLib] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [MLTemplateId] int NOT NULL,
  [FinishedStory] varchar(5000) NOT NULL
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO


CREATE TABLE [CategoryTemplate] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [CategoryId] int NOT NULL,
  [TemplateId] int NOT NULL
)
GO

CREATE TABLE [MLAnswerTemplate] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [TemplateId] int NOT NULL,
  [Content] varchar(500) NOT NULL,
  [PartOfSpeech] nvarchar(255) NOT NULL,
  [Position] int NOT NULL
)
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [MadLib] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [MadLib] ADD FOREIGN KEY ([MLTemplateId]) REFERENCES [MLTemplate] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [MLTemplate] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [CategoryTemplate] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [CategoryTemplate] ADD FOREIGN KEY ([TemplateId]) REFERENCES [MLTemplate] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [MLAnswerTemplate] ADD FOREIGN KEY ([TemplateId]) REFERENCES [MLTemplate] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE UserProfile
ADD UserTypeId bit NOT NULL DEFAULT(1);