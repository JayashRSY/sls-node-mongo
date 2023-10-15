const jwt = require('jsonwebtoken')
module.exports.verify = (r, context, cb) => {
    const token = r.authorizationToken;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return cb(null, 'JWT not authorized')
            return cb(null, generatePolicy(decoded.id, 'Allow', r.methodArn))
        })
    } else {
        return cb(null, 'JWT not authorized')
    }
}

const generatePolicy = (principleId, effect, resources) => {
    const res = {};
    res.principalId = principleId;
    if (effect && resources) {
        const policyDocument = {
            Version: '2012-10-17',
            Statement: [{
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resources
            }
            ]
        }
        res.policyDocument = policyDocument;
    }
    return res;
}