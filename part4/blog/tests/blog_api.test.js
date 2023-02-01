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

  expect(response.body).toHaveLength(6);
});

test("the first blog author is Edsger W. Dijkstra", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].author).toBe("Edsger W. Dijkstra");
});

test("the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
});

test("if the likes property is missing from the request, it will default to the value 0", async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  };
  await api.post("/api/blogs").send(newBlog).expect(201);
  const response = await api.get("/api/blogs");
  expect(response.body[5].likes).toBe(0);
});

test("if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request", async () => {
  const newBlog = {
    likes: 7,
  };
  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("a single blog post can be deleted", async () => {
  const response = await api.get("/api/blogs");
  const id = response.body[0].id;
  await api.delete(`/api/blogs/${id}`).expect(204);
});

test("a single blog post can be updated", async () => {
  const response = await api.get("/api/blogs");
  const id = response.body[0].id;
  const updatedBlog = {
    likes: 100,
  };
  await api.put(`/api/blogs/${id}`).send(updatedBlog).expect(200);
});
