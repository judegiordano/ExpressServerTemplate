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
```
./node_modules/.bin/eslint --init
```