const routes = require("express").Router();
const SessionController = require("./controllers/SessionController");

routes.get("/", (req, res) => {
    return res.send("Hello World");
});

routes.post("/sessions", SessionController.store);
module.exports = routes;
