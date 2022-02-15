const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/auth");

router.post("/login", authCtrl.getAccessToken);
router.post("/refresh", authCtrl.refreshAccessToken);

module.exports = router;
