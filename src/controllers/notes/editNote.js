const selectNoteByIdQuery = require("../../database/queries/notes/selectNoteByIdQuery");
const updateNoteQuery = require("../../database/queries/notes/updateNoteQuery");
const { generateError } = require("../../helpers");

const editNote = async (req, res, next) => {
  try {
    // Sacamos de path params la id.
    const { id } = req.params;

    // Obtenemos los campos a editar.
    const { title, text, category } = req.body;

    // Si no hay ningún campo a editar, lanzamos un error.
    if(!title && !text && !category) throw generateError("Faltan campos!",400);

    // Seleccionamos la nota con ese id.
    const note = await selectNoteByIdQuery(id);

    // Sacamos el id del usuario creador de la nota.
    const { user_id } = note;

    // Si no coincide con el usuario del token lanzamos un error.
    if (user_id != req.user.id) throw generateError("No tienes Permisos", 403);

    // Guardamos la nueva información en un objeto si no hay un campo rellenamos con la antigua.
    const updatedNote = {
      id: note.id,
      user_id: user_id,
      title: title || note.title,
      text: text || note.text,
      category: category || note.category,
      created_at: note.created_at,
    };

    // Llamamos a la consulta que actualiza la nota.
    await updateNoteQuery(updatedNote);

    // Envíamos la nota actualizada en la respuesta.
    res.send({ status: "ok", data: { updatedNote } });
  } catch (error) {
    next(error);
  }
};
module.exports = editNote;
