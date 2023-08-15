const insertNoteQuery = require("../../database/queries/notes/insertNoteQuery");
const { generateError, saveImage } = require("../../helpers");

const newNote = async (req, res, next) => {
  try {
    // Obtenemos la informacion del body.
    const { title, text, category } = req.body;

    // Si faltan campos lanzamos un error.
    if (!title || !text || !category) {
      throw generateError("faltan campos", 400);
    }

    // Declaramos una variable donde se guardará la imagen en caso de que haya.
    let imageName;

    if (req.files) imageName = await saveImage(req.files?.image);


    // Guardamos los datos en un objeto.
    let note = {
      title: title,
      text: text,
      image: imageName,
      category: category,
      user_id: req.user.id,
    };

    // Llamamos a la funcion de insertar nota y guardamos en una variable la id que nos devuelve
    const note_id = await insertNoteQuery(note);
    
    res.send({
      status: "ok",
      message: "Nota creada",
      data: {
        user_id: req.user.id,
        id: note_id,
        title: title,
        text: text,
        image: note.image,
        category: category,
        created_at: new Date(),
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = newNote;
