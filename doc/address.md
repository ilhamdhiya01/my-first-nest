# Address API Specification

## Create Address

Endpoint : POST /api/contacts/:id/address

Request Header :

- Authorization : "your token"

Request Body :

```json
{
  "street": "string", // optional
  "city": "string", // optional
  "state": "string", // optional
  "province": "string", // optional
  "country": "string", // required
  "postalCode": "string" // required
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": "string",
    "street": "string",
    "city": "string",
    "state": "string",
    "province": "string",
    "country": "string",
    "postalCode": "string"
  }
}
```

Response Body (Error) :

```json
{
  "error": "string"
}
```

## Get Address

Endpoint : GET /api/contacts/:id/address/:addressId

Request Header :

- Authorization : "your token"

Response Body (Success) :

```json
{
  "data": {
    "id": "string",
    "street": "string",
    "city": "string",
    "state": "string",
    "province": "string",
    "country": "string",
    "postalCode": "string"
  }
}
```

Response Body (Error) :

```json
{
  "error": "string"
}
```

## Update Address

Endpoint : PUT /api/contacts/:id/address/:addressId

Request Header :

- Authorization : "your token"

Request Body :

```json
{
  "street": "string",
  "city": "string",
  "state": "string",
  "province": "string",
  "country": "string",
  "postalCode": "string"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": "string",
    "street": "string",
    "city": "string",
    "state": "string",
    "province": "string",
    "country": "string",
    "postalCode": "string"
  }
}
```

Response Body (Error) :

```json
{
  "error": "string"
}
```

## Delete Address

Endpoint : DELETE /api/contacts/:id/address/:addressId

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

## Set Primary Address

Endpoint : PATCH /api/contacts/:id/address/:addressId/primary

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

## List Addresses

Endpoint : GET /api/contacts/:id/address

Request Header :

- Authorization : "your token"

Response Body (Success) :

```json
{
  "data": [
    {
      "id": "string",
      "street": "string",
      "city": "string",
      "state": "string",
      "province": "string",
      "country": "string",
      "postalCode": "string",
      "primary": "boolean"
    }
  ]
}
```

Response Body (Error) :

```json
{
  "error": "string"
}
```
