const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);

const Blog = require("../models/blog");

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("there is 6 blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(6);
  });

  test("the first blog author is Michael Chan", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].author).toBe("Michael Chan");
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
    expect(response.body[4].likes).toBe(0);
  });

  test("if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request", async () => {
    const newBlog = {
      likes: 7,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("a single blog post can be deleted", async () => {
    const response = await helper.blogsInDb();
    const toBeDeleter = response[0];

    await api.delete(`/api/blogs/${toBeDeleter.id}`).expect(204);

    const afterDeletion = await helper.blogsInDb();
    expect(afterDeletion).toHaveLength(response.length - 1);
  });

  test("a single blog post can be updated", async () => {
    const response = await helper.blogsInDb();
    const toBeUpdated = response[0];

    const updatedLikes = {
      likes: 100,
    };

    const updatedBlog = await api
      .put(`/api/blogs/${toBeUpdated.id}`)
      .send(updatedLikes)
      .expect(200);
    expect(updatedBlog.body.likes).toBe(100);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
