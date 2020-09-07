# Requirements

1. Create a web service in C#
   1. There must be two end points
   2. The first endpoint will take as a parameter JSON which includes a person’s first name, last name
2. When called the service will check to see if the person exists in the SQL Server database or not.
   1. If it does not, add the record and return a new GUID identifier
   2. If it does, then return the existing GUID identifier
3. The second endpoint will return the GUID IDs of every profile that matches the name passed
   1. If the value passed is a first name, then return the GUIDs of all records with the same first four characters of the first name
   2. If the value passed is a last name, then return the GUIDs of all records with the same first four characters of the last name
4. Please use stored procedures
5. Create a front end that shows us this works
6. Create a video where you walk us through your code

# About The Development

I went ahead and decided to use .net core with a react front-end to satisfy the requirement to have a front end to show that this works. To create the project, following command was run.

```
dotnet new react -o name-app
cd name-app
```

This created a setup so I can start working on the project right away without fussing over some overhead. After running the `cd name-app` command, for first time users, it is necessary to run `dotnet build` before running `dotnet run`. For the first time, the build command may take several minutes. Every other time will be a lot faster.

I was happy to see that this setup also came with my favorite npm package, ReactStrap. Meant less time installing it so I get some basic bootstrap put in.

# Backend Development

After the initial setup, I went ahead and started with the database. The requriement specified to use SQL Server in point 2. Therefore, I went ahead and opened up my SQL Server Management Studio and created a new database for this project. I will include all SQL needed to set this up in the `name-app\Data` folder that can be run once a database has been set up.

## TableSetup.sql

Initial SQL Script to be run first, this sets up the table.

## sp_GetGuidOfUserAndCreateIfNotInDatabase.sql

Stored procedure designed to accomplish the following task

- When called the service will check to see if the person exists in the SQL Server database or not.
  - If it does not, add the record and return a new GUID identifier.
  - If it does, then return the existing GUID identifier.

## sp_GetAllUsersThatMatchFirstSetOfCharacters.sql

Stored procedure designed to accomplish the following task

- The second endpoint will return the GUID IDs of every profile that matches the name passed
  - If the value passed is a first name, then return the GUIDs of all records with the same first four characters of the first name
  - If the value passed is a last name, then return the GUIDs of all records with the same first four characters of the last name
