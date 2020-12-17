# <span style="color:lightgreen">Expresso RESTful API</span> ☕💤🚀

## Features
* Multithreaded
* Asynchronous
* Database Connection Pooling
* JWT Authentication
* Password Hashing / Salting
* CORS Enabled
* Basic XSS / DDOS Prevention
* Local Docker Image for Development
---
### Running Locally
```sh
git clone https://github.com/judegiordano/ExpressServerTemplate.git
npm i
npm run build
npm run start
```
---
### Needed Environment Variables:
```
PORT<number>
JWT_SECRET<varchar>
CONNECTION_STRING<varchar>
NODE_ENV<string>
```
---
useful cmds
```
./node_modules/.bin/eslint --init
docker build -t <container-name> .
docker run -d -p 3001:3000 <container-name>
docker ps
docker logs <container-id> -f
docker stop <container-id>
docekr rm <container-id>
docker images
docker image rm <image-id>
docker pull mongo:latest
```
---