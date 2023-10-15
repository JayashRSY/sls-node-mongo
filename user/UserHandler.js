const User = require('./User')
const { success, errReponse } = require('../authentication/AuthenticationHelpers')

module.exports.myProfile = (r, cb) => {
    cb.callbackWaitsForEmptyEventLoop = false;
    return User.findById(r.requestContext.authorizer.principalId)
        .then(user => success(user))
        .catch(err => errResponse(err))
}
function myProfile(id) {
    return User.findById(id)
        .then(user => !user ? Promise.reject(new Error('user not found')) : user)
        .catch(err => errResponse(err))
}