//var userDl = require('../Backend/userDataLayer');

export default function login(req) {
  const user = {
    name: req.body.name
  };
  req.session.user = user;
//  userDl.addUser(user);
  return Promise.resolve(user);
}
