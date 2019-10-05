const routes = require("express").Router();
const authMiddleware = require("./middlewares/auth");
const SessionController = require("./controllers/SessionController");

routes.get("/", (req, res) => {
    return res.json({ message: "Server is running." });
});

routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);
module.exports = routes;
