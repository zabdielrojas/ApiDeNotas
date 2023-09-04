const selectNoteByUuidQuery = require("../../database/queries/notes/selectNoteByUuidQuery.js");
const {generateError} = require("../../helpers.js")

const getPublicNote = async (req, res, next) => {
  try {
    // Obtenemos el id de la nota de los path params.
    const { uuid } = req.params;

    // Llamamos a la consulta que devuelve la nota con ese id.
    const note = await selectNoteByUuidQuery(uuid);

    // Comprobamos si la nota es pública.
    if(note.is_public !== 1){
      // Si no lo es comprobamos si es nuestra. Y si no lo es, lanzamos un error.
      if(req.user?.id !== note.user_id){
        throw generateError("No tienes permiso para ver esta nota.",403)
      }
    }

    // Envíamos la información de la nota en la respuesta.
    res.send({ status: "ok", data: note });
  } catch (error) {
    next(error);
  }
};
module.exports = getPublicNote;
