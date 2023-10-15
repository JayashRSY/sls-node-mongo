const jwt = require('jsonwebtoken')

module.exports.signJWT = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: 604800 })
}

module.exports.ValidRegistration = (body) => {
    if (!body.password || body.password.length < 8) {
        return Promise.reject(new Error('password should be > 7 chars'))
    }
    if (!body.email || !body.email.includes('@')) {
        return Promise.reject(new Error('enter valid email'))
    }
    return Promise.resolve()
}


module.exports.verifyPassword = (sentPassword, realPassword, userId) => {
    return bcrypt.compare(sentPassword, realPassword)
        .then(valid => !valid ? Promise.reject(new Error('invalid password')) : this.signJWT(userId));
}

module.exports.success = (res) => {
    return { statusCode: 200, body: JSON.stringify(res) };
}

module.exports.errResponse = (err) => {
    return { statusCode: err.statusCode || 500, body: err.message };
}
