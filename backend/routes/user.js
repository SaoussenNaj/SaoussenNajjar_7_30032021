const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/admin", userCtrl.getAdmins);
router.get("/user", userCtrl.getUser);
router.delete("/user", userCtrl.delete);

module.exports = router;
