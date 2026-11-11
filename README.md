# AI-Based Electricity Connection Portal

A web application that simplifies the process of applying for a new
electricity connection. Consumers can submit applications online, upload
supporting documents, and track their application status. Administrators
can review applications through a separate dashboard.

## Features

### Consumer

-   Register and log in to the portal.
-   Apply for a new electricity connection.
-   Enter personal and address details.
-   Upload identity and address documents.
-   Receive an application ID after submission.
-   Track application status.

### Admin

-   Access a separate admin login.
-   View and manage submitted applications.
-   Review uploaded documents.
-   Update application decisions and handle pending or on-hold
    applications.

### AI-Assisted Verification

-   Supports identity and address document verification.
-   Helps identify possible duplicate applications.

*The AI features are intended to assist the verification process; final
application decisions are handled by the administrator.*

## Technology Stack

-   **Frontend:** React.js
-   **Backend:** Python Flask
-   **Database:** MySQL
-   **AI functionality:** Document verification and
    duplicate-application detection

## Application Workflow

1.  A consumer registers or logs in.
2.  The consumer fills out the electricity connection application.
3.  Required documents are uploaded.
4.  The portal saves the application and generates an application ID.
5.  The consumer uses the application ID to check the status.
6.  An administrator reviews the application and its documents.

## Backend API

  Endpoint                               Purpose
  -------------------------------------- -------------------------------------------------
  `POST /apply`                          Submit a new electricity connection application
  `GET /track-status/<application_id>`   Check an application's status

## Getting Started

To run this project locally, you will need:

-   Node.js and npm
-   Python
-   MySQL

### 1. Clone the repository

``` bash
git clone <your-repository-url>
cd <repository-folder>
```

### 2. Set up the database

Create the MySQL database and configure the database connection details
used by the Flask backend.

### 3. Run the backend

Install the Python packages required by the project, then start the
Flask application using the command configured in your project.

### 4. Run the frontend

Open the frontend folder, install its npm dependencies, and start it
using the script defined in its `package.json`.

> **Note:** Update these setup steps with your project's actual folder
> names, dependency files, and run commands before publishing the
> repository.

## Future Improvements

-   Add stronger document-validation checks.
-   Improve duplicate-application detection.
-   Add notifications for application-status updates.
-   Improve the admin dashboard and reporting.

## Project Purpose

The goal of this project is to make the electricity connection
application process more convenient, organized, and transparent through
an online portal with AI-assisted verification.
