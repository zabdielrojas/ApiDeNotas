const selectNoteByIdQuery = require("../../database/queries/notes/selectNoteByIdQuery");
const updateNoteQuery = require("../../database/queries/notes/updateNoteQuery");
const { generateError } = require("../../helpers");

const editNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, text, category } = req.body;

    const note = await selectNoteByIdQuery(id);
    const { user_id } = note;

    if (user_id != req.user.id) throw generateError("No tienes Permisos", 403);

    const updatedNote = {
      id: note.id,
      user_id: user_id,
      title: title || note.title,
      text: text || note.text,
      category: category || note.category,
      created_at: note.created_at,
    };

    await updateNoteQuery(updatedNote);

    res.send({ status: "ok", data: { updatedNote } });
  } catch (error) {
    next(error);
  }
};
module.exports = editNote;
