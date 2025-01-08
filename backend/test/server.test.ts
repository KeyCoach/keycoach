import request from "supertest";
import app from "../src/app";

describe("GET /test", () => {
  it("responds with Hello World!", async () => {
    const response = await request(app).get("/test");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World!");
  });
});
