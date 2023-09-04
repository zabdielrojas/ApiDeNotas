
const { generateError } = require('../../helpers');

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

        // Encriptamos la contraseña antes de guardarla en la base de datos.
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Llamamos a la función que inserta el usuario.
        await insertUserQuery(username,email,hashedPassword)
        

        // Envíamos la respuesta al usuario.
        res.status(201).send({
            status: 'Created',
            message:
                '¡Usuario registrado con éxito!',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = newUser;
