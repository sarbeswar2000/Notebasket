const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all notes : GET "/api/auth/fetchallnotes". No login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 1: Add a  notes using post  : GET "/api/notes/addnotes". login  required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    try {
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json({ savedNote });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// ROUTE 3: Add a  notes using put  : GET "/api/notes/updatenotes". login  required
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // find note to be updated
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Notes not found");
    }
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: deleting existing a  notes using put  : put "/api/notes/updatenotes". login  required
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // find note to be delete adn delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("Notes not found");
    }
    // allow  deletion only if user owns this Note
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ succes: "Note has been deleted ", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
