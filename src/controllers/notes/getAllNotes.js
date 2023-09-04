const selectAllNotesQuery = require("../../database/queries/notes/selectAllNotesQuery");

const getAllNotes = async (req, res, next) => {
  try {
    // Obtenemos el id del token.
    const user_id = req.user.id

    // Sacamos la categoría de los query params en caso de que la haya. 
    const { category } = req.query;

    //  Llamamos a la consulta de seleccionar notas.
    const notes = await selectAllNotesQuery(user_id, category)
    
    // Envíamos la lista con las notas en la respuesta.
    res.send({ status: "ok", data: notes });
  } catch (error) {
    next(error);
  }
};
module.exports = getAllNotes;
