# GR-RestAPI

*GR-RestAPI* is an RestAPI designed for a cosmetics website [glossyrays.com](https://glossyrays.com) where products will be sold and shipped to an client.

# Features
 [x] User Authenication and Data Storage<br>
 [] Product Cache<br>
 [] Ability to purchase items<br> 
 [] And more...<br>
 
# Documentation

Currently there are 5 different methods
 - Create an Account
 - Checking if an account exist under provided email
 - Authenicate Account
 - Get Account data
 - Delete an account
 
 **Creating an account**
 
 **NOTE**: These examples will be shown using http client
 
 ```http
POST http://api.glossyrays.com:3000/api/v1/auth/account/create
Accept: application/json
Content-Type: application/json

{
  "email": "email@example.com",
  "password": "Password123"
}
```

**Passwords must meet these requirements**:
 - At least 6 Characters
 - includes at least 1 number
 - Includes at least one captial letter
 - Includes at least one lower case letter
 - No Spaces
 
**Checking if an account exist under provided email**

```http
GET http://api.glossyrays.com:3000/api/v1/auth/account/exist
Accept: application/json
Content-Type: application/json

{
  "email": "email@example.com"
}
```

Given an account does exist under provided email it will return data via JSON like so:

```JSON
{
  "code": 200,
  "doesExist": true
}
```

**Authenicate Account**

```http
GET http://api.glossyrays.com:3000/api/v1/auth/account/auth
Accept: application/json
Content-Type: application/json

{
  "email": "email@example.com",
  "password": "Password123"
}
```

This checks if the provided credentials are correct and will return the Account's token if so.
returned data in JSON format will look like so:

```JSON
{
  "code": 200,
  "token": "j$n7jGXsbShtsyzO.PrjC7EOisJzdbJv"
}
```

**NOTE**: The account's token is the most important information about the Account. Please make sure it does not get leaked!

**Get Account data**

Unfortunately, currently there is no data to be given to the client other than the Account's email. In the future, more data will be provided.

```http
GET http://api.glossyrays.com:3000/api/v1/auth/account/getData
Accept: application/json
Content-Type: application/json
Authorization: j$n7jGXsbShtsyzO.PrjC7EOisJzdbJv
```

The returned JSON formatted data will look closely like this:

```JSON
{
  "code": 200,
  "email": "jayreesjpeterson@gmail.com"
}
```

**NOTE**: I will update this section as the data available grows.

**Delete an account**

**NOTE**: Account deletion is permanent and cannot be undone

```http
DELETE http://api.glossyrays.com:3000/api/v1/auth/account/delete
Accept: application/json
Content-Type: application/json
Authorization: 7iM4TP.hUg7voNDH.WsKPD5q71WMD3iO
```

# Contributors
 - Jayrees Peterson (DaRealPandaz)

# Packages used
 - Bcrypt ([npm](https://www.npmjs.com/package/bcrypt))
 - Database-js ([npm](https://www.npmjs.com/package/database-js))
 - Database-js-mysql ([npm](https://www.npmjs.com/package/database-js-mysql))
 - Express ([npm](https://www.npmjs.com/package/express))
 - Express-rate-limit ([npm](https://www.npmjs.com/package/express-rate-limit))
