const fs = require('fs');
const util = require('util');

// remove comments after getting it to work
const readFromFile = (file) =>{
  fs.readFile(file, (error, data) =>{
    if(error){
      console.log(error);
    }else{
      return data;
    } 
  });
};

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// function to remove note

module.exports = {readFromFile, writeToFile, readAndAppend}

