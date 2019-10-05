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

    it("should be able to access private routes with jwt token", async () => {
        const user = await factory.create("User", { password: "123456" });

        const response = await request(app)
            .get("/dashboard")
            .set("Authorization", `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it("should not be able to access private routes without jwt token", async () => {
        const user = await factory.create("User", { password: "123456" });

        const response = await request(app).get("/dashboard");

        expect(response.status).toBe(401);
    });

    it("should not be able to access private routes with invalid jwt token", async () => {
        const user = await factory.create("User", { password: "123456" });

        const response = await request(app)
            .get("/dashboard")
            .set("Authorization", "Bearer A123AB12C15E12222");

        expect(response.status).toBe(401);
    });
});
