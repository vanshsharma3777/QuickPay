
const {JWT_SECRET} = require("./config")
const jwt =require ('jsonwebtoken')

const authenticationMiddleware =  (req, res , next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader|| !(authHeader.startsWith("Bearer "))){
        return res.status(411).json({
            msg:"wrong authorization header"
        })
    }
    let token = authHeader.split(' ')[1]
    try{ 
        const decoded =jwt.verify(token , JWT_SECRET)
        req.userId=decoded.userId
        req.username=decoded.username
        next()
    }
    catch(err){
        res.status(411).json({
            msg:"some internal error",
            error:err.message
        })
    }
}

module.exports={
    authenticationMiddleware
};