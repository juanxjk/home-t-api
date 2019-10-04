const request = require("supertest");

const app = require("../../src/app");
const { User } = require("../../src/models");
const truncate = require("../utils/truncate");
describe("Authentication", () => {
    beforeEach(async () => {
        await truncate();
    });
    it("should authenticate with valid credentials", async () => {
        const userExample = {
            name: "Foo Bar",
            email: "foo@bar.com",
            password: "123456"
        };

        const user = await User.create(userExample);

        const response = await request(app)
            .post("/sessions")
            .send({ email: user.email, password: "123456" });

        expect(response.status).toBe(200);
    });

    it("should not authenticate with invalid credentials", async () => {
        const userExample = {
            name: "Foo Bar",
            email: "foo@bar.com",
            password: "123123"
        };

        const user = await User.create(userExample);

        const response = await request(app)
            .post("/sessions")
            .send({ email: user.email, password: "123456" });

        expect(response.status).toBe(401);
    });
});

describe("Database", () => {
    beforeEach(async () => {
        await truncate();
    });
    it("should create a new user", async () => {
        const userExample = {
            name: "Foo Bar",
            email: "foo@bar.com",
            password_hash: "123123"
        };
        const user = await User.create(userExample);

        expect(user.name).toBe(userExample.name);
    });
});
