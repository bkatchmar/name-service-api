CREATE PROCEDURE [sp_GetAllUsersThatMatchFirstSetOfCharacters] @PassedName VARCHAR(100), @Mode VARCHAR(10)
AS
	-- The second endpoint will return the GUID IDs of every profile that matches the name passed
	--	If the value passed is a first name, then return the GUIDs of all records with the same first four characters of the first name
	--	If the value passed is a last name, then return the GUIDs of all records with the same first four characters of the last name
	DECLARE @PartialName VARCHAR(100);
	SET @PartialName = SUBSTRING(@PassedName, 1, 4)

	IF @Mode = 'First'
		BEGIN
			SELECT [ID],[First],[Last] FROM [Name] WHERE [First] LIKE @PartialName + '%'
		END
	ELSE
		BEGIN
			SELECT [ID],[First],[Last] FROM [Name] WHERE [Last] LIKE @PartialName + '%'
		END
GO

-- Examples
--	EXEC [sp_GetAllUsersThatMatchFirstSetOfCharacters] @PassedName = 'Morty', @Mode = 'First'
--	EXEC [sp_GetAllUsersThatMatchFirstSetOfCharacters] @PassedName = 'Sanchez', @Mode = 'Last'