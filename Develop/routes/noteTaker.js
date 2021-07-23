const notes = require("express").Router();
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../utils/utilities");


//get Route for notes
notes.get("/", (req, res) => {
  readFromFile("../db/notes.json").then((data) => res.json(JSON.parse(data)));
});


// post Route for note
notes.post("/", (req, res) => {
    console.log(req.body);
    
    const { title, text } = req.body;
    
    if (req.body) {
        const newNote = {
            title,
            text,
        };
        
        readAndAppend(newNote, "./db/notes.json");
        res.json(`Note added succesfully 👍`);
    } else{
        res.error(`Uh Oh some error happened while adding note`);
    } 
});

// delete Route for notes
// work on it in a different approach, there is no id on the notes
notes.delete("/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("./db/notes.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id !== noteId);

      writeToFile("./db/notes.json", result);

      res.json(`🆗 Item Deleted `);
    });
});

module.exports = notes;
