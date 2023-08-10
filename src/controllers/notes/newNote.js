const insertNoteQuery = require("../../database/queries/notes/insertNoteQuery");
const { generateError } = require("../../helpers");

const newNote = async (req, res, next) => {
  try {
    //obtenemos la informacion del body
    const { title, text, category } = req.body;

    //si faltan campos lanzamos un error
    if (!title || !text || !category) {
      throw generateError("faltan campos", 400);
    }
    //guardamos los datos en un objeto
    const note = {
      title: title,
      text: text,
      category: category,
      user_id: req.user.id,
    };
    // llamamos a la funcion de insertar nota y guardaamos en una variable la id que nos devuelve
    const note_id = await insertNoteQuery(note);
    res.send({
      status: "ok",
      message: "Nota creada",
      data: {
        user_id: req.user.id,
        id: note_id,
        title: title,
        text: text,
        category: category,
        created_at: new Date(),
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = newNote;
