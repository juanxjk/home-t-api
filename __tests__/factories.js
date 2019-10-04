const { factory } = require("factory-girl");
const { User } = require("../src/models");

factory.define("User", User, {
    name: "Foo Bar",
    email: "foo@bar.com",
    password: "123456"
});

module.exports = factory;
