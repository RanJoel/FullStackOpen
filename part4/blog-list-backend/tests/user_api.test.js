const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("../models/user");
const app = require("../app");

const api = supertest(app);

const initialUsers = [
  {
    blogs: [],
    username: "ranj",
    name: "ranjoe",
    passwordHash: "test",
  },
  {
    blogs: [],
    username: "test",
    name: "test",
    passwordHash: "test",
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  let userObject = new User(initialUsers[0]);
  await userObject.save();
  userObject = new User(initialUsers[1]);
  await userObject.save();
});

test("username created with a suitable status code", async () => {
  const newUser = {
    username: "test12",
    name: "test",
    password: "idontknow",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/users");
  expect(response.body).toHaveLength(initialUsers.length + 1);

  const usernames = response.body.map((user) => user.username);
  expect(usernames).toContain(newUser.username);
});

test("invalid users is rejected with a suitable status code", async () => {
  const userWithInvalidUsername = {
    username: "ra",
    name: "hello",
    password: "secret",
  };

  await api
    .post("/api/users")
    .send(userWithInvalidUsername)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/users");
  expect(response.body).toHaveLength(initialUsers.length);

  const usernames = response.body.map((user) => user.username);
  expect(usernames).not.toContain(userWithInvalidUsername.username);
});

test("invalid password is rejected with a suitable status code", async () => {
  const userWithInvalidPassword = {
    username: "ranjoe",
    name: "hello",
    password: "se",
  };

  await api
    .post("/api/users")
    .send(userWithInvalidPassword)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/users");
  expect(response.body).toHaveLength(initialUsers.length);

  const usernames = response.body.map((user) => user.username);

  expect(usernames).not.toContain(userWithInvalidPassword.username);
});

test("duplicate users is rejected with a suitable status code", async () => {
  const userWithDuplicateUsername = {
    username: "ranj",
    name: "hello",
    password: "secret",
  };

  await api
    .post("/api/users")
    .send(userWithDuplicateUsername)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/users");
  expect(response.body).toHaveLength(initialUsers.length);

  const usernames = response.body.map((user) => user.username);

  expect(usernames).toContain(userWithDuplicateUsername.username);
});

afterAll(() => {
  mongoose.connection.close();
});
