## API STRUTURE & JOURNEY

### Initialize project
```bash
    npm init
```

## Install dependencies
### Install and initialize trypescript
```bash
    npm i typescript 
```
```bash
    npx tsc --init 
```
```bash
    npm install ts-node @types/node -D
```

### Install & configure nodemon
```bash
    npm install nodemon -D
```
- create nodemon.json file

### Install express
```bash
   npm install express
```
```bash
    npm install @types/express -D
```

### Install prisma
```bash
   npm i prisma @prisma/client
```
- initialize prisma

```bash
    npx prisma init
```
 - create model and migrate

```bash
    npx prisma migrate dev --name CreateUsersTable
```
### initialize .gitignore and add .env files
```bash
    git init
    npm i dotenv
```
### install bcrypt
```bash
    npm i bcrypt
    npm i --save-dev @types/bcrypt -D
```
### install cors
```bash
    npm i cors
    npm i --save-dev @types/cors -D
```

### install jsonwebtoken
```bash
    npm i jsonwebtoken
    npm i --save-dev @types/jsonwebtoken -D
```

### ADD LOGING
```bash
    npm i winston morgan
```
```bash
    npm i --save-dev @types/morgan
```
- [text](https://docs.chaicode.com/advance-node-logger/)

### CREATE SCHEMAS WITH ZOD
```bash
    npm i zod
```
### REDIS & BULLMQ
```bash
    npm i bullmq
```
 

### FOLDER STRUCTURE
- src
    - controllers
    - exceptions
    - middleware
    - routes
    - schemas
    - types
    - utils
        - secrets.ts
        - logger.ts
        - responses.ts


## ustils/secrets.ts
```ts
    import dotenv from 'dotenv';

    dotenv.config({path: '.env'});

    export const PORT = process.env.PORT || 3000;
    export const JWT_SECRET = process.env.JWT_SECRET;
```
