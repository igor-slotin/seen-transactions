
  ## Description

This is a test task for [Seen](https://seen.com/) made with [Nest](https://github.com/nestjs/nest)

It contains two endpoints:

1. /customer/customer-transactions/:customerId - to show transactions for customer and groupe them to each other

2. /fraud/fraud-transactions/:customerId - endpoint for internal usage to detect relations between customers based on signals


### Structure of the project

Project splited into a few modules

- data - responsible for working with data and could handle additional changes if there is a need of changing data source or the methods how to parse data

- customer - responsible for performing requests to customer endpoint

- fraud - responsible for hanling fraud related requests. Inside contains signals folder, where placed signals to detect some suspicious activity


Code contains coments for purpose of explaining what's context hidden behind the logic.

Also in the main url of the instance available simple page which contains links to the example urls for each endpoints

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```

Nest is [MIT licensed](LICENSE).
