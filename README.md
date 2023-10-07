# MCRM 
Recently studied nestjs and found it's much convinent then nodejs to develop an enterprise software.
So spent some time write a small application include both front & backend.

## A high level design idea
<img src="https://github.com/michael-hll/mcrm/blob/main/design/High%20Level%20Design.png" alt="drawing" width="500"/>

## Main Features
### Backend
1. Basic signup/signin authentication APIs(JWT) - Done
2. Auto detect restful apis and save them to database - Done
3. Maintain restful apis' roles - Done
4. Cache user or api's roles - Done
5. Global authentication guard and role guard - Done

### Frontend
(The UI code is referenced a another github project: react-typescript-mui-with-auth-starter)
1. Signup/Signin - Done
2. User Maintain - Done
3. Role Maintain - TODO
4. User's Role Maintain - TODO
5. API's Role maintian - TODO

## How To Run
Prerequisite: NodeJs, Docker Desktop

### Step 1 - Get the code
clone it to your local directory, eg: mcrm folder
### Step 2 Start BackEnd
2.1 Go to nest-server directory, run command 'docker-compose up -d', 
this will start 3 docker container: Postgres, pgAdmin and Redis server. 
The ports information you can find it from the docker compose file.

2.2 Once database is up you need to use pgAdmin to connect Postgres databse,
and create a database 'mcrm' there. The database name is maintained in the .env 
file, you can change it what ever you want.

2.3 Then run command 'npm install', this will bring in all js/ts packages in to your
nestjs server

2.4 Run command 'npm run start:dev', once the server is up, the database tables should
be also created in the Postgres database. The main tables are (users, roles, apis).

2.5 Run the 'init' restful api to create default roles and users:
curl -X POST http://localhost:3001/api/authentication/init

This api will create one ADMIN role and one DEFAULT role. And a user with these 2 roles 
email address: 'admin@test.com', password: Password123

Now the backend is ready. If you want to see all the apis available, from
browser enter this address: http://localhost:3001/swagger
You will see each api useage there:

<img src="https://github.com/michael-hll/mcrm/blob/main/design/backend-apis.png" alt="drawing" width="200"/>

### Step 3 Start the Frontend
3.1 Go to directory react-front and run command 'npm install'

3.2 Then run command 'npm start', this will start the front end at port 3000

3.3 From browser enter address: http://localhost:3000, you should see the login page:

<img src="https://github.com/michael-hll/mcrm/blob/main/design/login.png" alt="drawing" width="200"/>

