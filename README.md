# Feelsify The mental health tracking app

## Description

This mental health tracker app allows you to track your mental health daily.
You have the option to track 3 types of mental health.

* Stress
* Anxiety
* Depression

## Technical info

### How to get the app started:

0. Install and configure PostGreSQL and start the PSQL server.
1. Run the `setup.sh`* script.
2. Rename `server/sample.env` to `/server/.env` and edit config accordingly.
3. Use `npm start` in the root folder. 

Steps 0 to 3 only need to be done one time.
*You may first need to make the bash script executable with the command `chmod u+x setup.sh`

### Directories

* client - All client front-end files. (React) 
* server - All server back-end files. (ExpressJS + PostGreSQL) 

