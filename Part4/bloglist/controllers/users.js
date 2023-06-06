const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  const { password, name, username } = request.body;

  if (password === undefined || username === undefined) {
    return response
      .status(400)
      .json({ error: "missing username or password" });
  } else if (password.length < 3 || username.length < 3) {
    return response
      .status(400)
      .json({ error: "username or password must be at least 3 characters" });
  } else {
    try {
      const userExist = await User.findOne({ username });

      if (userExist) {
        return response
          .status(400)
          .json({ error: "`Username` already exists" });
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        username,
        name,
        passwordHash,
      });

      const savedUser = await user.save();
      response.status(201).json(savedUser);
    } catch (error) {
      next(error);
    }
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;
