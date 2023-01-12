const express = require("express");
// [TODO]
// Weitere benoetigte Module einbinden
const data = require("../models/persistence.js");

const router = express.Router();

router.get("/", function (req, res) {
  // [TODO]
  // Implementieren: Liste der abonnierten Podcasts anzeigen
  res.render("index");
});

router.get("/podcast", function (req, res) {
  // [TODO]
  // Implementieren: Detailseite zum Podcast mit dem gegebenen
  // Index anzeigen (Index als Anfrage/Query-Parameter gegeben,
  // Zugriff erfolgt mit: req.query.pc)
  res.render("podcast", { podcast: data.podcasts[req.query.pc] });
});

router.get("/episode", function (req, res) {
  // [TODO]
  // Implementieren: Detailseite zur Episode anzeigen (Indizes
  // als Anfrage/Query-Parameter gegeben, Zugriff erfolgt mit:
  // req.query.pc und req.query.ep)
  res.render("podcast", data[req.query.pc].episoden[req.query.ep]);
});

router.post("/abonnieren", function (req, res) {
  // [TODO]
  // Implementieren: Abonnieren eines Podcasts
});

router.use("*", function(req, res) {
  res.status(404);
  res.render("error");
});

module.exports = router;
