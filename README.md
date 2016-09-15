A demo which includes frontend and backend based on json-web-token.

## Features: 
 - Login and register based on JWT authorization of user
 - Separate frontend and backend based on RESTful API
 - Permission assignment

## Contains

- [x] [Webpack](https://webpack.github.io)
- [x] [React](https://facebook.github.io/react/)
- [x] [Express](https://github.com/expressjs/express)
- [x] [Express-jwt](https://github.com/auth0/express-jwt)
- [x] [Babel](https://babeljs.io/)
- [x] [Superagent](https://github.com/visionmedia/superagent)
- [x] [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [x] [Sequelize](https://github.com/sequelize/sequelize)
- [x] [Node-postgres](https://github.com/brianc/node-postgres)

## Pattern
Add the field of header named authorization to store JWT token after login of frontend.

Backend receives the JWT token and this API needs some permissions.

## Details

A model named "Role" which is designed to store different identity of user to distinguish different authorities.

You can change some configs at "config" dir. The premise is that you have already install the database environment.

Any suggestiton and criticism generally be made welcome.
