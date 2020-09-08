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

There is an assumption that a database in SQL Server named `NAMES` is already set up and is empty.

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

## Setting up Entity Framework

To get entity framework on this and to get it to talk to SQL Server, first I needed to run this

```
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

Afterwards I created the `Name.cs` file that acts like the context and the Model class. Within this context class, I added the call for the two stored procedures.

# Service / API Development

The service uses a lot of .NET Core's build in tools to help me with creating this application. Within the `Controllers` folder there is a `NameController.cs` class that will be our endpoint. This is where I use postman in order to help me debug each endpoint.

## /name/getall

Not in the requirements but I feel a `GetAll` is generally necessary.

## /name/returnnameguid

POST Command that takes in a Name object and runs it through the method to fulfill the requirement. The post request body will look like

```
{
	"First" : "Rick",
	"Last" : "Sanchez"
}
```

This will return the GUID of the object it matches. The stoerd procedure actually will create the object and then return that object back.

## /name/allguidsthatmatchname

Takes in a mode telling us if we want to use a first name or last name, what the name is, and all GUIDs that match those parameters. Since this takes in two strings, I made this a GET request that takes in these parameters, an example of this looks like

```
/name/allguidsthatmatchname?mode=Last&name=Smith
```

Alternatively we can just use these as params and not put them in the query string.

# Front End Development

My favorite thing about this sort of setup is how detached front end development can from the back end. The .NET Core development handles all server side handling, including communication with the database, but routing and front end rendering can be done completely in JavaScript via React. This way I can have front end specialist or those who primarily develop in JavaScript and have them work independent of the server side. With that said, I made a front end in React to satisfy the requirement of a front end.

## NPM Installs Used

Since ReactStrap and Bootstrap in general came out of the box when I first made this project, importing packages were not necessary except for one.

```
npm install axios --save
```

I prefer axios to the built in fetch library due to familiarity of axios and how I can potentially import this into another project and have it work right away. I like axios' flexibility as well, hence why I chose to install it as part of the project. It may be necessary for a first time use to `cd` into the ClientApp and run `npm install`.

## About Each File

### App.js

Primary entry point into the Reach App. Defines routing that the front end will use.

### api_call/CallApi.js

Uses axios to call each of our end points that we defined previously.

### components/Home.js

Default route, I decided to list all names in the DB so far here in a Table

### components/GetGuid.js

Calls the end point that returns a GUID of the name provided, otherwise it will write the new object to the DB and then return that GUID. Some basic validation so we are not submitting blank data to the DB.

### components/MathcingGuid.js

Select a mode and type in a name to see all guids of the matchinf first 4 letters of the name. Mode selects if First name or Last name.
