const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const axios = require("axios");
const env = require("./environment");

const url1 = "/api/v1/superhero/:id";
const url2 = "/api/v1/superheroes/:name";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	const message = `
	<h1>Welcome to the Super Hero Hunter App API Homepage 🔥</h1>
	<br>
	<h2>Available Routes 🚀:</h2>
	<ul>
		<li>GET ${url1} - Get a particular Superhero matching with the ID</li>
		<li>GET ${url2} - Get all the Superheroes matching with the Keyword</li>
	</ul>`;
	return res.status(200).send(message);
});

app.get(url1, async (req, res) => {
	try {
		const id = req.params.id;
		const url = `https://www.superheroapi.com/api/${env.api_key}/${id}`;
		let response = await axios.get(url);
		let { data } = response;
		return res.status(200).json({
			message: "Superhero Fetched Successfully!",
			data: data,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message,
		});
	}
});

app.get(url2, async (req, res) => {
	try {
		const name = req.params.name;
		const url = `https://www.superheroapi.com/api/${env.api_key}/search/${name}`;
		let response = await axios.get(url);
		let { data } = response;
		return res.status(200).json({
			message: "Superheroes Fetched Successfully!",
			data: data,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
			error: error.message,
		});
	}
});

app.listen(port, (err) => {
	if (err) {
		console.log(err);
		return;
	}
	console.log(`Server is running on port ${port}`);
});
