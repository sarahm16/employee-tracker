# employee-tracker

The purpose of this app is to allow a user to track employees within the company. The user may view all employees, view all roles, view all departments, add a role, add a department, add an employee, or update an employee's role

## How to use

npm install inquirer
node index

## Technologies

inquirer.js - used to prompt user, and use their response
mysql - used to store database and to perform queries. Queries are performed in each of the functions to access data in the employee database. MySQL joins are used to combine data from all three tables when the user chooses to view all employees.
