require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
const Person = require("./models/person");

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
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  let fullDate = new Date();
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${fullDate}</p>
  `);
});

app.get(`/api/persons/:id`, (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
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

  /*   if (doubleName !== undefined && body.name === doubleName.name) {
    return response.status(404).json({
      error: "name must be unique",
    });
  } */

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPersons) => {
    response.json(savedPersons);
  });
});

const PORT = process.env.VITE_PORT_KEY || 3001;
app.listen(PORT, () => {});
