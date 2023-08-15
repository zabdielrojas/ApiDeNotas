const selectAllNotesQuery = require("../../database/queries/notes/selectAllNotesQuery");

const getAllNotes = async (req, res, next) => {
  try {
    // Obtenemos el id del token.
    const user_id = req.user.id

    //  Llamamos a la consulta de seleccionar notas.
    const notes = await selectAllNotesQuery(user_id)
    
    // Envíamos la lista con las notas en la respuesta.
    res.send({ status: "ok", data: notes });
  } catch (error) {
    next(error);
  }
};
module.exports = getAllNotes;
