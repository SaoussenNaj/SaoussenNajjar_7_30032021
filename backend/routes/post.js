const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");

router.get("/posts", auth, postCtrl.getPosts);
router.post("/posts", auth, multer, postCtrl.createPost);
router.put("/posts/:id", auth, multer, postCtrl.modifyPost);
router.delete("/posts/:id", auth, postCtrl.deletePost);
