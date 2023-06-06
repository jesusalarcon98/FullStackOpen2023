const bcrypt = require("bcrypt");
const User = require("../models/user");
const supertest = require("supertest");
const helper = require("./test_materials");
const app = require("../app");
const api = supertest(app);

describe("when there is initially one user in DB", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({
      username: "Jesús Alarcón",
      name: "Jesús",
      passwordHash,
    });

    await user.save();
  });

  test("creation success with a new username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUserValid = {
      username: "UserValid",
      name: "valid",
      password: "root",
    };

    await api
      .post("/api/users")
      .send(newUserValid)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUserValid.username);
  });

  test("creation fails if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const usernameUnique = {
      username: "Jesús Alarcón",
      name: "Jesús",
      password: "root",
    };

    const result = await api
      .post("/api/users")
      .send(usernameUnique)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`Username` already exists");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails if username or password is lower than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const usernameLower = {
      username: "Jesús",
      name: "Jesús",
      password: "lo",
    };

    const result = await api
      .post("/api/users")
      .send(usernameLower)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username or password must be at least 3 characters"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("creation fails if username or password is not display", async () => {
    const usersAtStart = await helper.usersInDb();

    const usernameNonExist = {
      name: "Jesús",
      password: "lo",
    };

    const result = await api
      .post("/api/users")
      .send(usernameNonExist)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("missing username or password");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});
