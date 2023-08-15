require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const isAuth = require("./middlewares/isAuth");
const isUser = require("./middlewares/isUser");

const { PORT } = process.env;

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(fileUpload());

app.use(isAuth);

/**
 * ############################
 * ## Controladores usuarios ##
 * ############################
 */

const {
  newUser,
  loginUser,
  getOwnUser,
  editUser,
} = require("./controllers/users/index");

app.post("/users", newUser);

app.post("/users/login", loginUser);

app.get("/users", isUser, getOwnUser);

app.put("/users", isUser, editUser);

/**
 * ############################
 * ## Controladores de notas ##
 * ############################
 */

const {
  newNote,
  getAllNotes,
  getNote,
  toggleNoteIsPublic,
  editNote,
} = require("./controllers/notes/index");


app.post("/notes", isUser, newNote);
app.get("/notes", isUser, getAllNotes);
app.get("/notes/:id", isUser, getNote);
app.put("/notes/:id", isUser, toggleNoteIsPublic);
app.put("/notes/:id/edit", isUser, editNote);


/**
 * ####################################
 * ## Middleware de error/ not found ##
 * ####################################
 */

//Middleware de error.
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
});

// Middelware de ruta no encontrada.
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Ruta no encontrada",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at PORT: ${PORT}`);
});
