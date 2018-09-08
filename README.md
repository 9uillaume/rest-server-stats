# rest-server-stats
Express REST server written in JavaScript running in a Docker container along with Grafana

# Karma Getting started
Don't mind the docker environment setup which is a WIP for future side project.

As every node project requires dependencies:

`npm install`

Starting the server along with the DB connection:

`npm start`

*DISCLAIMER* I assume that you have `psql` setup locally on your machine
tests requires execution of an **.sql** file setting up a dummy database
then you are welcome to run the tests with:

`npm test`
