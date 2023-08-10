require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const {PORT} = process.env

const app = express()

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

/**
 * ############################
 * ## Controladores usuarios ##
 * ############################
 */

const {newUser} = require("./controllers/users/index")


app.post("/users",newUser)



/**
 * ####################################
 * ## Middelware de error/ not found ##
 * ####################################
 */

//Middelware de error.
app.use((err, req, res, next) => {
    console.error(err);
  
    res.status(err.statusCode || 500).send({
      status: "error",
      message: err.message,
    });
  });
  
  //Middelware de ruta no encontrada.
app.use((req, res) => {
    res.status(404).send({
      status: "error",
      message: "Ruta no encontrada",
    });
  });

  app.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`);
  });
  