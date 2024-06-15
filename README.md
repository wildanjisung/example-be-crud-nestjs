# About
Backend example for implement JWT with frontend vue

# Instalation
- clone this repo
```
git clone https://github.com/wildanjisung/sandbox-be-auth.git
```
- install package
```
npm install
```
- run this project
```
nest start -b swc -w
```
- run this project with debug
```
nest start -b swc -w --debug
```

# test this service
- loging for get token
```
curl -X POST http://localhost:3000/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
```
- access profile with no token. the result Unauthorized {"statusCode":401,"message":"Unauthorized"}
```
curl http://localhost:3000/auth/profile
```
- access profile page with token. change token <token> with your token.
```
curl http://localhost:3000/auth/profile -H "Authorization: Bearer <token>"
```

# Progress
[x] Auth
  [x] Signup
  [x] Signin

[] Config
  [] .env
[] Transformator

[] Master
  [] Inventory

[] add role

