const selectAllNotesQuery = require("../../database/queries/notes/selectAllNotesQuery");

const getAllNotes = async (req, res, next) => {
  try {
    //obtenemos el id del token
    let user_id = ""
    if (req.user) user_id = req.user.id

    const notes = await selectAllNotesQuery(user_id)
    
    res.send({ status: "ok", data: notes });
  } catch (error) {
    next(error);
  }
};
module.exports = getAllNotes;
