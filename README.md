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
