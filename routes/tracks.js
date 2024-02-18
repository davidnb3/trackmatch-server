const express = require("express");
const router = express.Router();

const trackCtrl = require("../controllers/tracks");

router.get("", trackCtrl.getAllTracks);
router.get("/trackmatches", trackCtrl.getAllTrackMatches);
router.post("/trackmatches", trackCtrl.createTrackMatch);
router.put("/trackmatches/:id", trackCtrl.updateTrackMatch);

module.exports = router;
