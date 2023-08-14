const selectNoteByIdQuery = require("../../database/queries/notes/selectNoteByIdQuery");
const toggleNoteIsPublicQuery = require("../../database/queries/notes/toggleNoteIsPublicQuery");
const { generateError } = require("../../helpers");

const toggleNoteIsPublic = async (req, res, next) => {
  try {
    const { id } = req.params;

    const note = await selectNoteByIdQuery(id);
    const { user_id } = note;
    if (user_id != req.user.id) throw generateError("No tienes Permisos", 403);
    await toggleNoteIsPublicQuery(note);

    res.send({ status: "ok", data: { is_public: !note.is_public } });
  } catch (error) {
    next(error);
  }
};
module.exports = toggleNoteIsPublic;
