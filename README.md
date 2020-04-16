![](https://j.gifs.com/lxNKZ1.gif)


## How to run this project

Run "venv/Scripts/activate", after run "flask run"
It will run on http://localhost:5000.

Open Frontend folder. Run "npm run start"
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Functionality

You can add subjects by using condition buidler in "Condition builder" and see all made subjects in "All subjects".

In backend you can:
add subject (POST: http://localhost/api/subjects)
delete subject (DELETE: http://localhost:5000/api/subjects/{id})
retrieve a subject (GET http://localhost:5000/api/subjects/{id})
retrieve all subjects (GET http://localhost:5000/api/subjects)
retrieve gender, language, channel (GET http://localhost:5000//api/config) 

Using UI you can see all subjects, delete one by one clicking on it and you can add subjects using condition builder. 


Frontend is made using React and ant design
Backend is made using Python/Flask and Python SQL toolkit - SQLAlchemy.


## What could be improved: 

1.In condition builder you can add several times the same category, but it will save only the last one. 
It would be better to hide or disable condition after it already has a value.

2.For condition builder I am using react-awesome-query-builder, by default it offers more operations, only == should be left
and for age operators ">" and "<" should be added.
(condition builder should be customized).

3.Now it is possible to add invalid data to database, because there is no validation in backend. 

4.Time by time you can't get data from database, because there is an json parsing error. 
Because of lack of time, I was not able to avoid this issue.

5.By default subject accepts marketing is false, it should be left empty.

## Something more that you should know

Retrieving enum values (gender, languages, channel) for use in UI - I do not retrieve enum values,
but I retrieve an object from backend where I have defined gender, language and channel values and titles. 
Object is used in config for condition builder.
