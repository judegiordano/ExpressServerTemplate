# ExpressServerTemplate

# This is Just an API, No Frontend

### Needed Environment Variables:

```
PORT<number>
SALT<varchar>
JWT_SECRET<varchar>
CONNECTION_STRING<varchar>
DATABASE<varchar>
COLLECTION<varchar>
NODE_ENV<string>
```

```sh
git init
heroku login -i
heroku create my-app-name
git add .
git commit -m "initial commit"
git push heroku master
heroku open
```
useful cmds
```
./node_modules/.bin/eslint --init
docker build -t <container-name> .
docker run -d -p 3001:3000 <container-name>
docker ps
docker logs <container-id> -f
docker stop <container-id>
docekr rm <container-id>
```