 DROP DATABASE IF EXISTS employee_trackerDB;
-- Creates the "top_songsDB" database --
CREATE DATABASE employee_trackerDB;

-- Makes it so all of the following code will affect top_songsDB --
USE employee_trackerDB;

CREATE TABLE department (
id INTEGER(11) AUTO_INCREMENT NOT NULL,
name VARCHAR(10) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INTEGER(11) AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary INTEGER(11),
department_id INTEGER(11),
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INTEGER(11) AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30),
role_id INTEGER(11) NOT NULL,
manager_id INTEGER(11),
PRIMARY KEY (id),
);