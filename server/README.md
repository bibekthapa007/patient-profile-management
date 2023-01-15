# Patient Profile Management API Server

## Table of Contents

- [Overview](#overview)
- [Development Setup](#development-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Continous Deployment](#continous-deployment)
- [Tests](#tests)

## Overview

Patient Profile Management is the api to keep the record of the patient record.

## Development Setup

## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Nest.js](https://docs.nestjs.com/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [Git](https://git-scm.com/downloads)
- [MySql](https://dev.mysql.com/downloads/installer/)

### Installation

##### 1. Clone the repository and install dependencies.

```sh
$ git clone https://github.com/bibekthapa007/patient-profile-management.git
$ yarn
```

##### 2. Copy `.env.example` as `.env` file inside your root directory. Update the environment variables based on stage.

```sh
$ cp .env.example .env
```

##### 3. Run migration to sync the database state.

```sh
$ yarn migrate
```

##### 4. Seed the database.

```sh
$ yarn seed
```

## Development Workflow

Start the development server.

```sh
$ yarn start:dev
```

When you make unit of changes such as `Creating API for updating status`. Here are the steps someone must adhere to before commiting changes:

#### 1. Lint your code.

```sh
$ yarn lint
```

#### 2. Run the prettify on your source code for consistent formatting.

```sh
$ yarn prettier
```

#### 3. Finally, commit your changes.

```sh
$ git commit -m "Commit" #duration <DURATION> <YOUR_COMMIT_MESSAGE>"
```

## Continous deployment

There are multiple build targets available for different stages. These images can be used to deploy or run jobs in different container based cloud infrastructure like Kubernetes, AWS ECS, Fargate, GCP Cloud Run etc.

1. Building a production image.

   ```sh
   $ docker build --target=prod -t app:prod .
   ```

2. Building an image for development.

   ```sh
   $ docker build --target=dev -t app:dev .
   ```

3. Building an image that runs migration and/or rollback.

   ```sh
    # Docker image that runs migration and seeds.
    $ docker build --target=migrate -t app:migrate .

    # Docker image that rollbacks migrations.
    $ docker build --target=migrate-rollback -t app:migrate-rollback .
   ```

Once the images have been built - all you need to do is run them providing a `.env` file. Like this:

```sh
$ docker run -v "/path/to/your/.env:/app/.env" app:migrate
```

## Tests

To run the tests you need to create a separate test database. Don't forget to update your `.env` file to include the connections for test database.

    $ NODE_ENV=test yarn migrate
    $ yarn test

Run tests with coverage.

    $ yarn test:coverage
