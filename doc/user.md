# User API Specification

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "string",
  "password": "string",
  "name": "string"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "string",
    "name": "string"
  }
}
```

Response Body (Error) :

```json
{
  "error": "string"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "string",
  "password": "string"
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "string",
    "name": "string",
    "token": "string"
  }
}
```

Response Body (Error) :

```json
{
  "error": "string"
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

- Authorization : "your token"

Response Body (Success) :

```json
{
  "data": {
    "username": "string",
    "name": "string",
    "token": "string"
  }
}
```

Response Body (Error) :

```json
{
  "error": "string"
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- Authorization : "your token"

Request Body :

```json
{
  "password": "string", // optional
  "name": "string" // optional
}
```

Response Body (Success) :

```json
{
  "data": {
    "username": "string",
    "name": "string"
  }
}
```

Response Body (Error) :

```json
{
  "error": "string"
}
```

## Delete User

Endpoint : DELETE /api/users/current

Request Header :

- Authorization : "your token"

Response Body (Success) :

```json
{
  "data": "OK"
}
```

Response Body (Error) :

```json
{
  "error": "string"
}
```

## Logout User

Endpoint : DELETE /api/users/logout

Request Header :

- Authorization : "your token"

Response Body (Success) :

```json
{
  "data": "OK"
}
```

Response Body (Error) :

```json
{
  "error": "string"
}
```
