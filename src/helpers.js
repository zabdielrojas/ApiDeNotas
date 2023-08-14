const path = require("path");
const fs = require("fs/promises");
const { v4: uuid } = require("uuid");
const sharp = require("sharp");

/**
 * ####################
 * ## GENERATE ERROR ##
 * ####################
 */
//Función que nos permite añadir un status code a los errores.

const generateError = (msg, status) => {
  const error = new Error(msg);
  error.statusCode = status;
  return error;
};

/**
 * ####################
 *   ## save file ##
 * ####################
 */
//Función que nos permite guardar archivos en el disco duro y devuelve el nombre con los que se han guardado.

const saveImage = async (image) => {
  //Guardamos el directorio en una variable.
  const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);
  try {
    //Comprobamos que exista el directorio y si no, lo creamos.
    await fs.access(uploadsPath);
  } catch {
    await fs.mkdir(uploadsPath);
  }
  //Convertimos la imagen en un objeto Sharp.
  const sharpImage = sharp(image.data);
  //Cambiamos el tamaño para que se ajuste a la nota .
  sharpImage.resize(320);
  //Generamos un nombre único y aleatorio para la imagen.
  const imageName = `${uuid()}.jpg`;
  //Guardamos la ruta donde va a ir nuestra imagen.
  const imagePath = path.join(uploadsPath, imageName);
  //Convertimos la imagen de vuelta.
  await sharpImage.toFile(imagePath);
  //Devolvemos el nombre para luego guardarlo en la base de datos.
  return imageName;
};

module.exports = { generateError, saveImage };
