const fs = require('fs');
const path = require('path');
const notes = {};

notes.new = function(title, content) {
    //Create a new file in the notes directory with the title and actual time as the filename
    const filePath = path.join(__dirname, '../notes/', title + '.txt');
    fs.writeFileSync(filePath, content);
}

notes.delete = function(title) {
    //Delete a file in the notes directory
    const filePath = path.join(__dirname, '../notes/', title + '.txt');
    fs.unlinkSync(filePath);
}

notes.read = function(title) {
    //Read a file in the notes directory
    const filePath = path.join(__dirname, '../notes/', title + '.txt');
    return fs.readFileSync(filePath, 'utf8');
}

notes.scan = function() {
    //Scan the notes directory and return an object with the title and content
    const files = fs.readdirSync(__dirname + '/../notes');
    const notesObj = {};
    files.forEach(function(file) {
        const filePath = path.join(__dirname, '../notes/', file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        //Add the timestamps to the object
        notesObj[file.replace('.txt', '')] = {
            title: file.replace('.txt', ''),
            content: fileContent,
            timestamp: new Date(fs.statSync(filePath).mtime),
            size: fs.statSync(filePath).size
        };
    });
    return notesObj;
}

notes.getSize = function(title) {
    const filePath = path.join(__dirname, '../notes/', title + '.txt');
    return fs.statSync(filePath).size;
}

module.exports = notes;