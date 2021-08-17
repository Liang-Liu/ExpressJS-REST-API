const express = require("express");
const apiRouter = express.Router();
const products = require("../data/products.json");
const { v4: uuidv4 } = require("uuid");

apiRouter.use(express.json()); // for parsing application/json
apiRouter.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// middleware that is specific to this router
// apiRouter.use(function timeLog(req, res, next) {
// 	console.log("Time: ", Date.now());
// 	next();
// });

// GET all products
apiRouter.get("/", function (req, res) {
	res.json(products);
});

// GET products by ID
apiRouter.get("/:id", function (req, res) {
	const id = req.params.id;
	const productReturn = products.filter((product) => product.id === id);
	if (productReturn.length !== 0) {
		res.json(productReturn);
	} else {
		res.status(404).json({ msg: "No products with '" + id + "' found" });
	}
});

// POST product
apiRouter.post("/", function (req, res) {
	console.log(req.body);
	const productId = uuidv4();
	const { name, description, price } = req.body;
	const product = {
		id: productId,
		name,
		description,
		price,
	};
	// res.writeHead(201, { "Content-Type": "application/json" });
	res.status(201).json({ msg: "product created", product });
});

// PUT product by ID
apiRouter.put("/:id", function (req, res) {
	const id = req.params.id;
	let product = products.filter((product) => product.id === id);
	if (product.length !== 0) {
		const { name, description, price } = req.body;
		product = {
			id: id,
			name: name || product.name,
			description: description || product.description,
			price: price || product.price,
		};
		res.status(200).json({ msg: "product updated", product });
	} else {
		res.status(404).json({ msg: "No products with '" + id + "' found" });
	}
});

// DELETE products by ID
apiRouter.delete("/:id", function (req, res) {
	const id = req.params.id;
	const found = products.some((ele) => ele.id === id);
	const newProducts = products.filter((product) => product.id !== id);
	if (found) {
		res.json(newProducts);
	} else {
		res.status(404).json({ msg: "No products with '" + id + "' found" });
	}
});

module.exports = apiRouter;
