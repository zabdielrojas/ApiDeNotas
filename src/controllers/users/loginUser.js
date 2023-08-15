const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const {generateError} = require("../../helpers") 
const selectUserByEmailQuery = require("../../database/queries/users/selectUserByEmailQuery")

const loginUser = async(req,res,next) => {

    try {
        const {email,password}=req.body

        // Si falta alguno de los campos mandamos un error.
        if(!email || !password){
            throw generateError("faltan campos", 404)
        }
        // Buscamos al usuario con el email de la petición y lo guardamos en una variable.
        const user = await selectUserByEmailQuery(email)

        // Comprobamos que la contraseña del usuario sea la misma que la de la petición. 
        const validPassword = await bcrypt.compare(password, user.password)

        // Si no son la misma contraseña lanzamos un error.
        if(!validPassword){
            throw generateError("contraseña incorrecta",401)
        }

        // Guardamos la información que queremos que tenga nuestro token.
        const tokenInfo={
            id:user.id 
        }
        // Generamos nuestro token con esa información, el secreto de nuestra api y las opciones que queramos.
        const token = jwt.sign(tokenInfo,process.env.SECRET,{expiresIn:"30d"})

        // Envíamos el token en la respuesta.
        res.send({status:"ok",data:{token}})
    } catch (error) {
        next(error)
    }
}
 
module.exports =loginUser