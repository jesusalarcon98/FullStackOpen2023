require("dotenv").config();

const PORT = process.env.VITE_PORT_KEY;
const MONGODB_URI = process.env.VITE_MONGODB_KEY;

module.exports = {
  MONGODB_URI,
  PORT,
};
