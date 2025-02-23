const request = require("supertest");
const app = require("../..");
const { clearDatabase } = require("../../db.connection");
const req = request(app);

describe("lab testing:", () => {
  describe("users routes:", () => {
    let testUser;

    beforeAll(() => {
      testUser = {
        name: "test_user",
        email: "test@example.com",
        password: "password123",
      };
    });

    beforeEach(async () => {
      await req.post("/user/signup").send(testUser);
    });

    afterEach(async () => {
      await clearDatabase();
    });

    it("req to get(/user/search) ,expect to get the correct user with his name", async () => {
      const res = await req.get("/user/search").query({ name: testUser.name });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.name).toBe(testUser.name);
      expect(res.body.data.email).toBe(testUser.email);
    });

    it("req to get(/user/search) with invalid name ,expect res status and res message to be as expected", async () => {
      const res = await req
        .get("/user/search")
        .query({ name: "nonexistent_user" });

      // Match exact response from getUserByName controller
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe(
        "There is no user with name: nonexistent_user"
      );
    });
  });

  describe("todos routes:", () => {
    let testUser, userToken, todoId;

    beforeAll(async () => {
      try {
        // Create test user
        testUser = {
          name: "todo_user",
          email: "todo@example.com",
          password: "password123",
        };

        // First signup
        await req.post("/user/signup").send(testUser);

        // Then login to get JWT token
        const loginRes = await req.post("/user/login").send({
          email: testUser.email,
          password: testUser.password,
        });
        userToken = loginRes.body.data;

        // Create a test todo
        const todoRes = await req
          .post("/todo")
          .set("authorization", userToken)
          .send({ title: "Test Todo" });
        todoId = todoRes.body.data._id;
      } catch (error) {
        console.error("Error in beforeAll:", error);
      }
    });

    afterAll(async () => {
      await clearDatabase();
    });

    it("req to patch(/todo/:id) with id only ,expect res status and res message to be as expected", async () => {
      const res = await req
        .patch(`/todo/${todoId}`)
        .set("authorization", userToken)
        .send({});

      // Match exact response from updateTitleTodoById controller
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("must provide title and id to edit todo");
    });

    it("req to patch(/todo/:id) with id and title ,expect res status and res to be as expected", async () => {
      const updatedTitle = "Updated Todo";
      const res = await req
        .patch(`/todo/${todoId}`)
        .set("authorization", userToken)
        .send({ title: updatedTitle });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.title).toBe(updatedTitle);
    });

    it("req to get(/todo/user) ,expect to get all user's todos", async () => {
      const res = await req.get("/todo/user").set("authorization", userToken);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("req to get(/todo/user) ,expect to not get any todos for user hasn't any todo", async () => {
      // Create new user without todos
      const newUser = {
        name: "no_todos",
        email: "notodos@example.com",
        password: "password123",
      };

      // Signup then login to get token
      await req.post("/user/signup").send(newUser);
      const loginRes = await req.post("/user/login").send({
        email: newUser.email,
        password: newUser.password,
      });
      const newToken = loginRes.body.data;

      const res = await req.get("/todo/user").set("authorization", newToken);

      // Match exact response from getUserTodos controller
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain("Couldn't find any todos for");
    });
  });
});
