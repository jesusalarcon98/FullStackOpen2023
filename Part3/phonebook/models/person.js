require("dotenv").config();
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const password = process.env.VITE_MONGODB_KEY;
const url = `mongodb+srv://JesusAlarcon:${password}@clusterprueba.psxsc82.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: String, required: true },
});

try {
  noteSchema.plugin(uniqueValidator);
} catch (error) {
  console.log("Error while adding uniqueValidator plugin:", error.message);
}

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Realiza las acciones adecuadas para manejar el error, como cerrar conexiones, guardar registros, etc.
  process.exit(1); // Finaliza la aplicación
});


module.exports = mongoose.model("Person", noteSchema);
