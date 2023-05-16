const express = require("express");
const app = express();

let persons = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  let fullDate = new Date();
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${fullDate}</p>
  `);
  /* app.get("/", (request, response) => {
  response.send("<h1>adioooos World!</h1>");
}); */
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
