CREATE PROCEDURE [sp_GetGuidOfUserAndCreateIfNotInDatabase] @First VARCHAR(100), @Last VARCHAR(100)
AS
	-- When called the service will check to see if the person exists in the SQL Server database or not
	--	If it does not, add the record and return a new GUID identifier
   --	If it does, then return the existing GUID identifier
	IF EXISTS (SELECT [ID],[First],[Last] FROM [Name] WHERE [First] = @First AND [Last] = @Last)
		BEGIN
		   SELECT [ID],[First],[Last] FROM [Name] WHERE [First] = @First AND [Last] = @Last
		END
	ELSE
		BEGIN
			INSERT INTO [Name] VALUES (default,@First,@Last)
			SELECT [ID],[First],[Last] FROM [Name] WHERE [First] = @First AND [Last] = @Last
		END
GO

-- Example: EXEC [sp_GetGuidOfUserAndCreateIfNotInDatabase] @First = 'Rick', @Last = 'Sanchez'