# Sample Jenkins project

A simple nodejs web application designed to be tested and deployed by Jenkins.

Some of the technologies being used in this app:

* NodeJS 6.x
* Express 4.x
* Mongoose 4.x
* Angular 1.5.x
* Mocha
* NodeUnit

## Environment Variables

```bash
export NODE_ENV = "production" # can be: development, production or test
export HTTP_ADDR = "localhost"
export HTTP_PORT = 3000
export MONGO_URI = "mongodb://localhost:27017/sample-jenkins"
```

## Installing the server

```bash
npm install
```

## Starting up the server

```bash
npm start
```

## Stopping the server

```bash
npm stop
```

## Restarting the server

```bash
npm restart
```
