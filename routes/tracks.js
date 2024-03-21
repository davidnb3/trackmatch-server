const express = require("express");
const router = express.Router();

const trackCtrl = require("../controllers/tracks");

router.get("", trackCtrl.getAllTracks);

module.exports = router;
