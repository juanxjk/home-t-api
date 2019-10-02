const { User } = require("../../src/models");

describe("Database", () => {
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
