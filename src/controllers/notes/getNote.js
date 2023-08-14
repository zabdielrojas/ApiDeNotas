const selectNoteByIdQuery = require("../../database/queries/notes/selectNoteByIdQuery");

const getNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    const note = await selectNoteByIdQuery(id);

    res.send({ status: "ok", data: note });
  } catch (error) {
    next(error);
  }
};
module.exports = getNote;
