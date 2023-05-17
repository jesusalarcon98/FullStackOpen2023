const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());

morgan.token("info-post", (request) => JSON.stringify(request.body));

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :info-post"
  )
);
let persons = [
  {
    id: 1,
    name: "Ada Lovelace",
    number: "928-301-234",
  },
  {
    id: 2,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 3,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
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
});

app.get(`/api/persons/:id`, (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete(`/api/persons/:id`, (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const doubleName = persons.find((person) => person.name === body.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  if (doubleName !== undefined && body.name === doubleName.name) {
    return response.status(404).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
