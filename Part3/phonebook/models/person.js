require("dotenv").config();
const mongoose = require("mongoose");

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
  name: String,
  number: String,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", noteSchema);
