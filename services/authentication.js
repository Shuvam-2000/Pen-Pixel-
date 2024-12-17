const JWT = require('jsonwebtoken');
const secret = "Y@m@toww2Okin@aw@IJN"

createTokenForUser = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    const token = JWT.sign(payload,secret, {
        expiresIn: '2d'
    })
    return token;
}

validateTokenForUser = (token) => {
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateTokenForUser
}