const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    // req 请求
    // res 响应
    res.send("Hello, World!");
});

app.get("/users/:userId/books/:bookId", (req, res) => {
    res.send(req.params);
});

app.route("/books")
    .get((req, res) => {
        res.send("Get a random book");
    })
    .post((req, res) => {
        res.send("Add a book");
    })
    .delete((req, res) => {
        res.send("Delete all books");
    });

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
