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
});
