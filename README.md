# Human Resource Management System

This repository contains the source code for a web-based HRMS developed as a 3rd-semester group project for the Database Management System Module at the Department of Computer Science and Engineering, University of Moratuwa, Sri Lanka.

## Overview

The HRMS replicates a Human Resource Management System tailored for an Apparel company, offering several levels of authentication and functionalities. This is a full-stack application with the front end developed using **React.js** and the back end developed using **Node.js**. **MySQL** was utilized to store data and information.

The system comprises four main access levels, each granting users different permissions and functionalities. Every user requires a username and password to log in, with a single admin user having the highest priority. All passwords are initially set to "password" for convenience. Depending on the user levels, each user has several functionalities, all accompanied by a user interface.

### Access Levels:

- **Level 1:**
  - View personal details
  - Change the personal user account password
  - Request leaves

- **Level 2:**
  - All Level 1 user functionalities
  - View subordinates and their details
  - Edit subordinate details
  - Accept subordinate leaves

- **Level 3:**
  - All Level 2 user functionalities
  - Adding new employees
  - View absence-related functionalities
  - Generate reports based on a limited set of pre-designed queries

- **Level 4 (Admin User):**
  - All Level 3 user functionalities
  - Adding new attributes to the database
  - Edit access-related functionalities

## How to Build and Run

To run this application locally, the following tools are required: MySQL, Node.js.

After installing the above tools:

1. Clone this repository to a local storage.
2. Run the script on `./backend/sql/Final.sql` in your MySQL Shell to instantiate the database on the local computer.
3. Set your local server password as an environment variable named `DB_KEY`.
4. Run the `npm start` script on `./backend` to run the backend on port 8800.
5. Run the `npm start` script on `./frontend` to run the frontend on the default port.
6. Open the localhost port on a search engine on the local computer to access the page.
