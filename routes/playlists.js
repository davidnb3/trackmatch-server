const express = require("express");
const router = express.Router();

const trackCtrl = require("../controllers/playlists");

router.get("", trackCtrl.getAllPlaylists);
router.get("/:id", playlistCtrl.getPlaylistById);
router.post("", trackCtrl.createPlaylist);

module.exports = router;
