## This repo belongs to a Docker tutorial by:  TechWorld with Nana

[Docker Tutorial for Beginners [Full Course in 3 Hours]](https://www.youtube.com/watch?v=3c-iBn73dDE)



## demo app - developing with Docker

This demo app shows a simple user profile app set up using 
- index.html with pure js and css styles
- nodejs backend with express mode
- mongodb for data storage

All components are docker-based

#### To start the application

Step 1: start mongodb and mongo-express

    docker-compose -f docker-compose.yaml up
    
_You can access the mongo-express under localhost:8080 from your browser_
    
Step 2: in mongo-express UI - create a new database "my-db"

Step 3: in mongo-express UI - create a new collection "users" in the database "my-db"       
    
Step 4: start node server 

    node server.js
    
_You can access the application under localhost:3000 from your browser_

#### To build a docker image from the application

    docker build -t my-app:1.0 .       
    
The dot "." at the end of the command denotes location of the Dockerfile.


## Volumes
Depending on the service the data can be stored on a volume for persistent 
data. Serch for the default data directory location.
mongodb = '/data/db

[expanation here](https://youtu.be/3c-iBn73dDE?t=9312)
