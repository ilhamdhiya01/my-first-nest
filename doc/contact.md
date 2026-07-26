# Contact API Specification

## Create Contact

Endpoint : POST /api/contacts

Request Header :

- Authorization : "your token"

Request Body :

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string"
  }
}
```

Response Body (Error) :

```json
{
  "error": "string"
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header :

- Authorization : "your token"

Response Body (Success) :

```json
{
  "data": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string"
  }
}
```

Response Body (Error) :

```json
{
  "error": "string"
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header :

- Authorization : "your token"

Request Body :

```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phone": "string"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string"
  }
}
```

Response Body (Error) :

```json
{
  "error": "string"
}
```

## Delete Contact

Endpoint : DELETE /api/contacts/:id

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

## Search Contact

Endpoint : GET /api/contacts

Request Header :

- Authorization : "your token"

Query Parameters :

- name : "string", optional
- email : "string", optional
- phone : "string", optional
- page : "number", default 1
- size : "number", default 10

Response Body (Success) :

```json
{
  "data": [
    {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string"
    }
  ],
  "paging": {
    "page": "number",
    "totalPage": "number",
    "size": "number"
  }
}
```

Response Body (Error) :

```json
{
  "error": "string"
}
```
