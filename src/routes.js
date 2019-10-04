const routes = require("express").Router();
const authMiddleware = require("./middlewares/auth");
const SessionController = require("./controllers/SessionController");

routes.get("/", (req, res) => {
    return res.send("Hello World");
});

routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);
module.exports = routes;
