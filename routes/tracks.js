const express = require("express");
const router = express.Router();

const trackCtrl = require("../controllers/tracks");

router.get("", trackCtrl.getAllTracks);
router.delete("/:id", trackCtrl.deleteTrackById);

module.exports = router;
