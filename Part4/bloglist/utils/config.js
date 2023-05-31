require("dotenv").config();

const PORT = process.env.VITE_PORT_KEY;
let MONGODB_URI = process.env.VITE_MONGODB_KEY;
if (process.env.NODE_ENV === "test") {
  MONGODB_URI = process.env.VITE_TEST_KEY;
}

module.exports = {
  MONGODB_URI,
  PORT,
};
