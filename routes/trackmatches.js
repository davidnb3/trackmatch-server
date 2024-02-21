const express = require("express");
const router = express.Router();

const trackCtrl = require("../controllers/trackmatches");

router.get("", trackCtrl.getAllTrackMatches);
router.post("", trackCtrl.createTrackMatch);
router.put("/:id", trackCtrl.updateTrackMatch);
router.delete("/:id", trackCtrl.deleteTrackMatch);

module.exports = router;
