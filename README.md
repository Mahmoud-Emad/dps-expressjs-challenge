# DPS Backend Coding Challenge

## Overview

This repository contains a very basic web application based on Typescript and Express.js. Main application file is `index.ts`. Node and npm are required.

## Environment Setup

Ensure you have Node.js (v14.x or later) and npm (v6.x or later) installed.  
To set up and run the application, execute the following commands:

```
npm install
npm run dev
```

The application will then be accessible at http://localhost:3000.

## Project Context

You will develop a backend system for managing data about a company's projects and their associated reports. Each project may have multiple reports linked to it, though having reports is not mandatory. Start your implementation using the provided SQLite database([db/db.sqlite3](./db/db.sqlite3)).

Refer to the database schema provided for understanding the data structure 👇

![Database schema](images/database_schema.png)

NOTE: You can use ([db.service.ts](./src/services/db.service.ts)) to handle SQL queries to the database.

## Challenge Tasks

-   **Fork this project:** Start by forking this repository
-   **REST API Development:** Design and implement a RESTful API to create, read, update, and delete projects and their reports.
-   **Special API Endpoint:** Create an API endpoint that retrieves all reports where the same word appears at least three times.
-   **Optional:** Secure all API routes with a hardcoded authentication token ("Password123").
-   **Submission:** After completing the challenge, email us the URL of your GitHub repository.
-   **Further information:**
    -   If there is anything unclear regarding requirements, contact us by replying to our email.
    -   Use small commits, we want to see your progress towards the solution.
    -   Code clean and follow the best practices.

\
Happy coding!


## Implementation

### API Endpoints

- Projects
    - Create `/projcts`
    - Get all `/projcts`
    - Get project `/projcts/:projectId/`
    - Update project `/projcts/:projectId/`
    - Delete project `/projcts/:projectId/`
- Reports
    - Create `/reports`
    - Get all `/reports`
    - Retrieves all reports where the same word appears at least three times `/frequent-words`
    - Get project `/reports/:reportId/`
    - Update project `/reports/:reportId/`
    - Delete project `/reports/:reportId/`

### Environment

Copy this content and paste it into a `.env` file in the same directory if you wish to change the default values.\
Please note that these fields are optional, and if they are not set, the server will run with the default values.\
You should only use it to customize the variables without changing the code base.

```INI
AUTH_TOKEN=<the_auth_token>
PORT=<server_port>
```

### How to run tests

```sh
npm run test
```

### How to run Docker

```sh
docker build -t express_app .
docker run express_app
```
