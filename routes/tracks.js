const express = require("express");
const router = express.Router();

const trackCtrl = require("../controllers/tracks");

router.get("/", trackCtrl.getAllMatches);
router.post("/", trackCtrl.createMatch);
router.delete("/", trackCtrl.deleteMatch);

module.exports = router;
