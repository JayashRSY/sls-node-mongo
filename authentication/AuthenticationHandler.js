const db = require('../database')
const bcrypt = require('bcryptjs-then')
const User = require('../user/User')
const { signJWT, ValidRegistration, success, errResponse } = require('./AuthenticationHelpers')

module.exports.register = (r, cb) => {
    cb.callbackWaitsForEmptyEventLoop = false;
    return db()
        .then(() => register(JSON.parse(r.body)))
        .then((res) => success(res))
        .catch((err) => errResponse(err))
}
module.exports.login = (r, cb) => {
    cb.callbackWaitsForEmptyEventLoop = false;
    return db()
        .then(() => register(JSON.parse(r.body)))
        .then((res) => success(res))
        .catch((err) => errResponse(err))
}
function register(body) {
    console.log("🚀 ~ file: AuthenticationHandler.js:21 ~ register ~ body:", body);
    return ValidRegistration(body)
        .then(() => User.findOne({ email: body.email }))
        .then((exists => exists ? Promise.reject(new Error('email already exists')) : bcrypt.hash(body.password, 8)))
        .then(user => ({ auth: true, token: signJWT(user._id) }))
}
function login(body) {
    return User.findOne({ email: body.email })
        .then(user => !user ? Promise.reject(new Error('Incorrect pswd or email ')) : comparePassword(body.password, user.password, user._id))
        .then(signJWT => ({ auth: true, token: signedJWT }))
}