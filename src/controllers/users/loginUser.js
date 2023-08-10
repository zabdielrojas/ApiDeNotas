const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const {generateError} = require("../../helpers") 
const selectUserByEmailQuery = require("../../database/queries/users/selectUserByEmailQuery")

const loginUser = async(req,res,next) => {

    try {
        const {email,password}=req.body

        if(!email|| !password){
            throw generateError("faltan campos", 404)
        }

        const user =await selectUserByEmailQuery(email)
        console.log(user)
        const validPassword =await bcrypt.compare(password,user.password)

        if(!validPassword){
            throw generateError("contraseña incorrecta",401)
        }

        const tokenInfo={
            id:user.id 
        }

        const token = jwt.sign(tokenInfo,process.env.SECRET,{expiresIn:"30d"})
        res.send({status:"ok",data:{token}})
    } catch (error) {
        next(error)
    }
}
 
module.exports =loginUser