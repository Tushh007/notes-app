const { Console } = require('console')
const fs = require('fs')
const chalk = require('chalk')

var error = chalk.red.inverse
var success = chalk.green.inverse

const getNotes = function() {
    return "Your notes..."
}

const addNote = function (title, body) {
    
    const notes = loadNotes()

    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)

        console.log(success('New note added!'))
    } else {
        console.log(error('Note Already Taken!'))
    }
    
    
}

const removeNote = function (title) {
    const notes = loadNotes()
    let noteDeleted = false

    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })
    
    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(success('Note: ', title, ' - deleted!'))
    } else {
        console.log(error('Note: ', title, ' - not found!'))
    }

}

const saveNotes = function (notes) {
    const dataJSON =  JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
    
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}