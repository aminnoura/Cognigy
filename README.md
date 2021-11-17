# Cognigy task, chat application

## Description
This would be a Web-based Chatbot UI, based on frontend coding challenge from Cognigy.

## Technologies
1. React
2. Redux
3. FuseBox (bundler)
4. Typescript
5. Material UI
6. @cognigy/socket-client

## Scripts
* Clone the project
1. `yarn` -> installing the required dependencies
2. `yarn dev` -> run the app in development mode with hot reloading
3. `yarn prod` -> run the app in Production mode, create a production version under prod folder
    ### send `cat image` to chat and get a nice cat image back
### Or try the Docker
4. `yarn dockerBuild` -> building the docker container
5. `yarn dockerRun` -> running the docker, then visit http://localhost:3000

## Config
rename config file (remove `.copy` from file name) and add your token and endpoint. <br/>
File name should be `conf.ts` after renaming

## To Fix or Improve
* Issue with add local variables from .env file
* I never worked with material UI before, probably it can be much better 
* Add linting
* Robot doesn't trim the message and a space at the end of message cause a wrong answer
