const selectNoteByIdQuery = require("../../database/queries/notes/selectNoteByIdQuery");

const getNote = async (req, res, next) => {
  try {
    // Obtenemos el id de la nota de los path params.
    const { id } = req.params;

    // Llamamos a la consulta que devuelve la nota con ese id.
    const note = await selectNoteByIdQuery(id);

    // Envíamos la información de la nota en la respuesta.
    res.send({ status: "ok", data: note });
  } catch (error) {
    next(error);
  }
};
module.exports = getNote;
