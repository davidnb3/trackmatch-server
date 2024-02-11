const express = require("express");
const router = express.Router();

const trackCtrl = require("../controllers/playlists");

router.get("/playlists", trackCtrl.getAllPlaylists);
router.post("/playlists", trackCtrl.createPlaylist);

module.exports = router;
