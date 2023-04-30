const express = require("express");
const {postNote, getAllNotes,getNoteById, updateNote, removeNote} = require("../controllers/noteControllers");
const isLoggedin = require("../middlewares/requireLogin");
const router = express.Router();

router.route("/note/:userId").post(isLoggedin, postNote);
router.route("/notes/:userId").get(isLoggedin, getAllNotes);
router.route("/note/:id").get(isLoggedin, getNoteById);
router.route("/note/:id").put(isLoggedin, updateNote);
router.route("/note/:id").delete(isLoggedin, removeNote);

module.exports = router;