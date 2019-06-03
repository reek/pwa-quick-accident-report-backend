<img src="https://raw.githubusercontent.com/reek/pwa-quick-accident-report/master/src/assets/icons/icon-128x128.png" align="right" />

# Quick Accident Report (Backend)

[![Build Status](https://travis-ci.com/reek/pwa-quick-accident-report-backend.svg?branch=master)](https://travis-ci.com/reek/pwa-quick-accident-report-backend) [![Dependencies Status](https://david-dm.org/reek/pwa-quick-accident-report-backend/status.svg)](https://david-dm.org/reek/pwa-quick-accident-report-backend) [![Known Vulnerabilities](https://snyk.io/test/github/reek/pwa-quick-accident-report-backend/badge.svg)](https://snyk.io/test/github/reek/pwa-quick-accident-report-backend)


## Overview
***This personal project is currently under development***

This application is intended to help the driver during a traffic accident.
It will facilitate the collection of data for insurance or to warn emergency services as well as the exchange of data between drivers.

- You don't have an accident statement report form ?
- You have forgotten your documents ?
- You don't know where you are ?
- You don't know what to do ?
- You can't remember emergency numbers ?

## Project
- [Front-end](https://reek.github.io/pwa-quick-accident-report/)
- [Back-end](https://reek.github.io/pwa-quick-accident-report-backend/)

## Back-end
Server REST API endpoint.
> [Demo](https://quiet-sands-22246.herokuapp.com/api)

## Features
- Secured REST API.
- Store data in [MongoAtlas](https://www.mongodb.com/cloud/atlas) an NoSQL database.
- Data object validated with [Mongoose](https://mongoosejs.com/).
- Saving images to [Imgur](https://imgur.com/).
- Sending confirmation and reset password mail with [Sendgrid](https://sendgrid.com/).
- Secure authentication with [JSON Web Token](https://jwt.io/)
- Use [Slack](https://slack.com/) bot for feedback.

## Technologies
- [Express](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [MongoDB](https://www.mongodb.com/) - MongoDB is an open-source document database and leading NoSQL database.
- [MongoAtlas](https://www.mongodb.com/cloud/atlas) - MongoDB Atlas delivers the world's leading database for modern applications as a fully automated cloud service.
- [Mongoose](https://mongoosejs.com/) - Mongoose provides a straight-forward, schema-based solution to model your application data.
- [Heroku](https://heroku.com/) - Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.
- [Typescript](https://www.typescriptlang.org/) - TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- [NodeJS](https://nodejs.org/) - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine
- [Travis CI](https://travis-ci.com/) - The simplest way to test and deploy your projects. Easily sync your GitHub projects with Travis CI and you'll be testing your code in minutes

## Quick start
- Run node `$ nvm use 11`
- Install dependencies `$ npm install`
- Run app `$ npm run dev`
- Navigate to `http://localhost:8080/api`

> Tips
- Make requests with [Advanced REST Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) or [Postman](https://www.getpostman.com/)

## Feedback
- [Github](https://github.com/reek/pwa-quick-accident-report-backend/issues) - Report issues.
- [Slack](https://nomade-advanced.slack.com/messages/CJD9AMSRW) - Join chat.

## Contribute
Contributions are always welcome!
Please submit a [PR](https://github.com/reek/pwa-quick-accident-report-backend/pulls).
