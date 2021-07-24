const notes = require("express").Router();
const uniqid = require("uniqid");
const fs = require('fs');
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../utils/utilities");


//get Route for notes
notes.get("/notes", (req, res) => {
  // readFromFile("./db/notes.json").then((data) => res.json(data));
  fs.readFile("./db/notes.json", (error, data) =>{
    if(error){
      console.log(error);
    }else{
      // use .send instead of .Json
      res.send(data);
    }
  });
});


// post Route for note
notes.post("/notes", (req, res) => {
    console.log(req.body);
    
    const { title, text } = req.body;
    let newNote;
    let id = uniqid();
    console.log(id);
    if (req.body) {
        newNote = {
            id,
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
notes.delete("/notes/:id", (req, res) => {
  // gets the req variable, and id
  const noteId = req.params.id;

  fs.readFile('./db/notes.json', (error, data) =>{
    if(error){
      console.log(error);
    }else{
      let jsonData = JSON.parse(data);

      const result = jsonData.filter((note) => note.id !== noteId);
    
      writeToFile("./db/notes.json", result);
    
      res.json(`🆗 Item Deleted `);
    } 
  });  
});

module.exports = notes;
