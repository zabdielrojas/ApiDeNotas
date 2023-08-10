
const { generateError } = require('../../helpers');

const selectUserByEmailQuery = require("../../database/queries/users/selectUserByEmailQuery")
const insertUserQuery = require("../../database/queries/users/insertUserQuery")

const bcrypt = require('bcrypt');

const saltRounds = 10; // Número de encriptaciones de bcrypt.

const newUser = async (req, res, next) => {
    try {
        const {username,email,password} = req.body;

        // Si faltan campos lanzamos un error.
        if (!username || !email || !password) {
            throw generateError('¡Faltan datos obligatorios!', 400);
        }

       // Comprobamos si hay ya un usuario registrado con ese email.
       const userMail = await selectUserByEmailQuery(email)

        // Si así fuese lanzamos un error.
        if (userMail.length > 0) {
            throw generateError(
                '¡Ya existe un usuario con ese email en la base de datos!',
                409
            );
        }

        // Encriptamos la contraseña antes de guardarla en la base de datos.
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Llamamos a la función que inserta el usuario.
        await insertUserQuery(username,email,hashedPassword)

        res.send({
            status: 'Ok',
            message:
                '¡Usuario registrado con éxito!',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newUser;
