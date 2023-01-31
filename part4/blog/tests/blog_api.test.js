const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});

test("there is one blog", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(1);
});

test("the first blog author is Edsger W. Dijkstra", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].author).toBe("Edsger W. Dijkstra");
});

test("the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

