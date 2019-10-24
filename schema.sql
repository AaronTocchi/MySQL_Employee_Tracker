 DROP DATABASE IF EXISTS employee_trackerDB;
-- Creates the "top_songsDB" database --
CREATE DATABASE employee_trackerDB;

-- Makes it so all of the following code will affect top_songsDB --
USE employee_trackerDB;

CREATE TABLE department (
deperatment_id INTEGER(11) AUTO_INCREMENT NOT NULL,
name VARCHAR(10) NOT NULL,
PRIMARY KEY (deperatment_id)
);

CREATE TABLE role (
role_id INTEGER(11) AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary INTEGER(11),
deperatment_sid INTEGER(11),
PRIMARY KEY (role_id),
Foreign Key (deperatment_sid) REFERENCES department(deperatment_id)

);

CREATE TABLE employee (
employee_id INTEGER(11) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30),
role_sid INTEGER(11) NOT NULL,
manager_sid INTEGER(11),
PRIMARY KEY (employee_id),
Foreign Key (role_sid) REFERENCES role(role_id),
Foreign KEY (manager_sid) REFERENCES employee(employee_id)
);