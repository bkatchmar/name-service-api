USE [NAMES] --Assumes the database name is simply set to "NAMES"
GO

-- Set up the table
CREATE TABLE [Name]
(
	ID UNIQUEIDENTIFIER PRIMARY KEY default NEWID(),
	[First] VARCHAR (100),
	[Last] VARCHAR (100) 
)
GO
 
INSERT INTO [Name] VALUES (default,'Rick','Sanchez')
INSERT INTO [Name] VALUES (default,'Morty','Smith')
INSERT INTO [Name] VALUES (default,'Krombopulos','Michael')