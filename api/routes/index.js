const express = require("express");
const pessoas = require("./pessoasRoute");

module.exports = (app) => {
  app.use(express.json(), pessoas);
  app.get("/", (req, res) => {
    res.status(200).send("Hello Express");
  });
};

