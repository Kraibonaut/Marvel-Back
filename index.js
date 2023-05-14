require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

// const morgan = require("morgan
app.use(express.json());
app.use(cors());
// <---------------------Routes du Site--------------------------------------------------->
app.get("/home", (req, res) =>
  res.status(200).json({ message: "Hello from the server !" })
);

// <----------------------Route Characters------------------------------------------->
app.get("/characters", async (req, res) => {
  try {
    const limit = req.query.limit || "100";
    const skip = req.query.skip || "0";
    const name = req.query.name || "";
    const photo = req.query.path;
    const comics = req.query.comics;
    const description = req.query.description;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&limit=${limit}&photo=${photo}&descrition=${description}&comics=${comics}`
    );
    res.status(200).json(response.data);
    // console.log(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// <--------------------------Route comics-------------------------------------------->
app.get("/comics", async (req, res) => {
  try {
    const photo = req.query.path;
    const title = [req.query.title];
    const description = req.query.description;
    // let sort = req.query.sort || "title";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&photo=${photo}&description=${description}&`
    );
    res.status(200).json(response.data);
    // console.log(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// <------------------------Route Favoris-------------------------------------->
app.get("/favs", (req, res) => {
  try {
    res.status(200).json({ message: "Vos favs!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// <------------------------Route Research dans comics---------------------------------------->

app.get("/comics/:characterId", async (req, res) => {
  try {
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// <----------------Route All-------------------------------------->

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ message: "Route does not exist", app: "Express-Routes" });
});

// <--------------------------Port ---------------------------------------->

app.listen(process.env.PORT, () => {
  console.log("Hey!!! Server has started!!!");
});
