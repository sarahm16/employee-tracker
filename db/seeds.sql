
INSERT into department (name)
values ('sales'),
    ('Engineering'),
    ('Accounts'),
    ('Legal'),
    ('Lawyer'),
    ('research'),
    ('operations'),
    ('software');


INSERT into ROLE (title,salary,department_id)
values ('SalesPerson', '500',1),
    ('Lead Engineer', '8000', 2),
    ('Legal Team Lead', '10000', 4),
    ('Lawyer', '5000', 4),
    ('Sales Manager', '3000', 1), 
    ('Accountant','1000', 3),
    ('Software Engineer','7000',8),
    ('Sales Lead','3000',1);                                                    

 INSERT into employee (first_name,last_name,role_id)
 values ('John','Doe',8),
    ('Mike','Chan',1),
    ('Ashley','Rodriguez',2),
    ('Malia','Brown',6),
    ('Sarah','Lourd',3),
    ('Tom','Allen',4),
    ('Sanju','Smith',7);