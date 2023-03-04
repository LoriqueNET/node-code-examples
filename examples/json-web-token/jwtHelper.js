const fs = require('fs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const jwtExpiresIn = 300;
const jwtPrivate = fs.readFileSync('./jwt', 'utf8').toString();
const jwtPublic = fs.readFileSync('./jwt.pem', 'utf8').toString();

const tokenPayload = (user) => {
  return {
    id: user._id,
    username: user.name,
    roles: user.roles
  };
}

const newToken = (user) => {
  const payload = tokenPayload(user)
  const options = {
    expiresIn: jwtExpiresIn,
    algorithm: 'RS256',
    audience: 'json-web-token-example'
  };

  return jwt.sign(payload, jwtPrivate, options);
}

const verifyToken = async (token) => {
  const decoded = await promisify(jwt.verify)(
    token,
    jwtPublic
  );

  return decoded;
}

module.exports = {
  newToken,
  verifyToken,
}