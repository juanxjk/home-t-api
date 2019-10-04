const request = require("supertest");

const app = require("../../src/app");
const truncate = require("../utils/truncate");
const factory = require("../factories.js");

describe("Authentication", () => {
    beforeEach(async () => {
        await truncate();
    });

    it("should receive JWT Token when authenticated with valid credentials", async () => {
        const user = await factory.create("User", { password: "123456" });

        const response = await request(app)
            .post("/sessions")
            .send({ email: user.email, password: "123456" });

        expect(response.body).toHaveProperty("token");
    });

    it("should authenticate with valid credentials", async () => {
        const user = await factory.create("User", { password: "123456" });

        const response = await request(app)
            .post("/sessions")
            .send({ email: user.email, password: "123456" });

        expect(response.status).toBe(200);
    });

    it("should not authenticate with invalid credentials", async () => {
        const user = await factory.create("User", { password: "12346546" });

        const response = await request(app)
            .post("/sessions")
            .send({ email: user.email, password: "123456" });

        expect(response.status).toBe(401);
    });
});
