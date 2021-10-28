const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");

router.post("/posts/:id", auth, commentCtrl.addComment);
router.put("/posts/:id", auth, commentCtrl.modifyComment);
router.delete("/posts/:id", auth, commentCtrl.deleteComment);
