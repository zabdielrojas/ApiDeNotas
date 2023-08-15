const selectNoteByIdQuery = require("../../database/queries/notes/selectNoteByIdQuery");
const toggleNoteIsPublicQuery = require("../../database/queries/notes/toggleNoteIsPublicQuery");
const { generateError } = require("../../helpers");

const toggleNoteIsPublic = async (req, res, next) => {
  try {
    // Sacamos el id de path params.
    const { id } = req.params;

    // Seleccionamos la nota con ese id.
    const note = await selectNoteByIdQuery(id);
    // Sacamos el id del usuario creador de la nota.
    const { user_id } = note;

    // Si no es el usuario que la creó lanzamos un error.
    if (user_id != req.user.id) throw generateError("No tienes Permisos", 403);

    // Si lo fuese llamamos a la función que marca como pública o privada una nota.
    await toggleNoteIsPublicQuery(note);
    
    // Envíamos en la respuesta  el nuevo dato is_public.
    res.send({ status: "ok", data: { is_public: !note.is_public } });
  } catch (error) {
    next(error);
  }
};
module.exports = toggleNoteIsPublic;
