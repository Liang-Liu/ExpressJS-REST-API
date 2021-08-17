const express = require("express");
const app = express();
const apiRouter = require("./routers/api.js");

const PORT = process.env.PORT || 5000;

app.use("/api/products", apiRouter);

app.listen(PORT, () => {
	console.log("Server is running on PORT " + PORT);
});

app.get("/", (req, res, next) => {
	res.send("Hello world");
});
