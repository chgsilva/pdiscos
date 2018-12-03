# pdiscos

# Back end(Restful api):

## Project setup
```
1. Please import the file present on /back/db_scipts/sql_dump.sql to your sql server before executing the node server.
2. update the file /back/config/dbConfig with your sql server credentials
3. Install dependencies
    $ cd /back
    $ npm install
```

### Compiles and hot-reloads for development
```
$ cd back/
$ nodemon index.js localhost 5000
```

# front end:
## Project setup
```
1. update the file /front/src/consts with the address of the running back end address should be something like this: const BASE_URL = "http://<your_ip>:5000/"

2. Install dependecies:
    cd front/
    npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```