const express = require("express");
const app = express();
const router = express.Router();
const port = 3000;

router.use((req, res, next) => {
    console.log(req.headers)
    if (!req.headers["x-auth"]) return next("router");
    next();
});

router.get("/user/:id", (req, res) => {
    res.send("hello, user!");
});

app.use("/admin", router, (req, res) => {
    res.sendStatus(401);
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});