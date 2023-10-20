-- Create the database if it does not exist
DROP DATABASE hrms;

CREATE DATABASE IF NOT EXISTS hrms;

-- Use the hrms database
USE hrms;

-- Create the 'pay_grade' table
CREATE TABLE IF NOT EXISTS `pay_grade` (
  `paygrade_id` CHAR(10),
  `basic_salary` FLOAT,
  `ot_benefits` FLOAT,
  `leave_type_id` CHAR(3),
  `number_of_leaves` INT,
  PRIMARY KEY (`paygrade_id`)
);

-- Create the 'job_title' table
CREATE TABLE IF NOT EXISTS `job_title` (
  `job_title_id` char(10),
  `job_title_name` varchar(20),
  `paygrade_id` char(10),
  PRIMARY KEY (`job_title_id`),
  FOREIGN KEY (`paygrade_id`) REFERENCES `pay_grade`(`paygrade_id`)
);

-- Create the 'employee_record' table
CREATE TABLE IF NOT EXISTS `employee_record` (
  `record_id` char(10),
  `employee_id` char(10),
  `leave_type_id` char(3),
  `leaves_taken` int,
  PRIMARY KEY (`record_id`)
);

-- Create the 'leave_request' table
CREATE TABLE IF NOT EXISTS `leave_request` (
  `leave_request_id` char(10),
  `record_id` char(10),
  `leave_type_id` char(3),
  -- Changed data type to match 'employee_record'
  `description` varchar(80),
  `supervisor_approval` boolean,
  PRIMARY KEY (`leave_request_id`),
  FOREIGN KEY (`record_id`) REFERENCES `employee_record`(`record_id`)
);

-- Create the 'permission_level' table
CREATE TABLE IF NOT EXISTS `permission_level` (
  `permission_level_id` char(10),
  `view_information_access` boolean,
  `edit_information_access` boolean,
  `absence_related_access` boolean,
  `adding_employee_access` boolean,
  `add_attributes_access` boolean,
  -- Corrected the typo in column name
  PRIMARY KEY (`permission_level_id`)
);

-- Create the 'user' table
CREATE TABLE IF NOT EXISTS `user` (
  `user_name` varchar(20),
  `password` varchar(255),
  `permission_level_id` char(10),
  PRIMARY KEY (`user_name`),
  FOREIGN KEY (`permission_level_id`) REFERENCES `permission_level`(`permission_level_id`)
);

-- Create the 'organization' table
CREATE TABLE IF NOT EXISTS `organization` (
  `registration_id` char(10),
  `name` varchar(20),
  `address` varchar(50),
  PRIMARY KEY (`registration_id`)
);

-- Create the 'department' table
CREATE TABLE IF NOT EXISTS `department` (
  `department_id` char(10),
  `organization_id` char(10),
  `hod_id` char(10),
  `area` varchar(20),
  `budget` float,
  -- Removed the incorrect size specification
  PRIMARY KEY (`department_id`),
  FOREIGN KEY (`organization_id`) REFERENCES `organization`(`registration_id`)
);

-- Create the 'employee' table
CREATE TABLE IF NOT EXISTS `employee` (
  `employee_id` char(10),
  `NIC` char(12),
  `name` varchar(50),
  -- Changed the length to 50
  `user_name` varchar(20),
  `supervisor_id` char(10),
  `job_title_id` char(10),
  `department_id` char(10),
  `employment_status` varchar(20),
  `birth_day` date,
  `marital_status` varchar(20),
  -- Increased the length to 20
  `vital_information` varchar(255),
  `nationality` varchar(20),
  PRIMARY KEY (`employee_id`),
  FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`),
  FOREIGN KEY (`job_title_id`) REFERENCES `job_title`(`job_title_id`),
  FOREIGN KEY (`supervisor_id`) REFERENCES `employee`(`employee_id`) -- Corrected the foreign key reference
);

-- Create the 'contact_details' table
CREATE TABLE IF NOT EXISTS `contact_details` (
  `employee_id` char(10),
  `primary_phone_number` varchar(10),
  -- Corrected the column name
  `secondary_phone_number` varchar(10),
  `email_address` varchar(50),
  `primary_emergency_contact` varchar(10),
  `secondary_emergency_contact` varchar(10),
  `address` varchar(70),
  PRIMARY KEY (`employee_id`)
);