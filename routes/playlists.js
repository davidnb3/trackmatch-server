const express = require("express");
const router = express.Router();

const playlistCtrl = require("../controllers/playlists");

router.get("", playlistCtrl.getAllPlaylists);
router.get("/:id", playlistCtrl.getPlaylistById);
router.post("", playlistCtrl.createPlaylist);
router.post("/:id", playlistCtrl.addTrackMatchToPlaylist);
router.put("/:id", playlistCtrl.updatePlaylist);
router.delete("/:id", playlistCtrl.deletePlaylist);
router.put("/:id/trackMatches", playlistCtrl.removeTrackMatchFromPlaylist);

module.exports = router;
