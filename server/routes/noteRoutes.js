const express = require("express");
const {postNote, getAllNotes,getNoteById, updateNote, removeNote} = require("../controllers/noteControllers");
const router = express.Router();

router.route("/note").post(postNote);
router.route("/notes").get(getAllNotes);
router.route("/note/:id").get(getNoteById);
router.route("/note/:id").put(updateNote);
router.route("/note/:id").delete(removeNote);

module.exports = router;