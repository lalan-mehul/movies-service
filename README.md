# movies-service

## The script folder contains a node script to parse json and generate SQL insert queries to the database. The json file is expected to be available in the same folder

Command to run the script:
node movieParsingFromJson.js

## The docker compose file contains MySQL container as well as container for the application service programmed using express over node.js

Command to run the application:
docker-compose up --build

The end-point will be exposed on port 4000
e.g. https://<hostname>:4000/movies

## pending TODO items:
Unit tests for controllers, services, routes

Authentication and authorisation