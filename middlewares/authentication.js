const { validateTokenForUser } = require("../services/authentication")

checkForAunthenticationCookie = (cookieName) => {
    return(req,res,next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            return next();
        };
        try {
            const userPayload = validateTokenForUser(tokenCookieValue)
            req.user = userPayload;
        } catch (error) {}
        return next()
    }
}

module.exports ={
    checkForAunthenticationCookie
};