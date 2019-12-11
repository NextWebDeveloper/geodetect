import secret from "../auth/assets";
import User from "../db/schemas/userSchema";
const jwt = require('jwt-simple');

const myInterceptor = (req,res,next) =>{
    if (req.path !== '/api/join' && req.path !== '/api/signin' && req.path !== '/api/detect_ip') {
        if(!req.headers['authorization']) {
            return res.sendStatus(401)
        }
        try {
            var auth = jwt.decode(req.headers['authorization'], secret)
        } catch (err) {
            return res.sendStatus(403)
        }
        User.findOne({email: auth.email}, function(err, user) {
            if (err) {return res.sendStatus(500)}
            else {
                next();
            }
        })
    } else {
        next();
    }
}

export default myInterceptor

