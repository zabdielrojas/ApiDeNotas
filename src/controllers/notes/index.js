const editNote = require("./editNote");
const toggleNoteIsPublic = require("./toggleNoteIsPublic");
const getNote = require("./getNote");
const getPublicNote = require("./getPublicNote");
const newNote = require("./newNote");
const getAllNotes = require("./getAllNotes");
module.exports = {
  newNote,
  getAllNotes,
  getNote,
  toggleNoteIsPublic,
  editNote,getPublicNote
};
