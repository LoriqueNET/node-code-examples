const jwtHelper = require('./jwtHelper');

const user = {
  '_id': 1,
  'name': 'Martin Ricken',
  'roles': ['editor', 'developer', 'architect']
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

try {

  // Create token synchronously
  const token = jwtHelper.newToken(user);

  console.log(`Raw token: ${token}`)
  console.log('##############');

  jwtHelper.verifyToken(token)
    .then(verifiedToken => {
      if (verifiedToken) {
        console.log(`Verified token : ${verifiedToken}`)
        console.log('##############');

        // Verify the user is valid here

        console.log(`User ID: ${verifiedToken.id}`)
        console.log(`Username: ${verifiedToken.username}`)
        console.log(`Roles: ${verifiedToken.roles}`)

      } else {
        console.log('Token could not be verified');
      }

    })
    .catch(err => {
      console.log(err.message);
      console.log(err);
    })

} catch (err) {

	//console.log(err);

}