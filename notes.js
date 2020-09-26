const { Console } = require('console')
const fs = require('fs')
const chalk = require('chalk')

var error = chalk.red.inverse
var success = chalk.green.inverse
var header = chalk.bold.yellow.inverse
var body = chalk.italic

const addNote = (title, body) => {
    
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => notes.title === title)

    if (!duplicateNote) {
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

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(header(note.title))
        console.log(body(note.body))
    } else {
        console.log(error("Note not found!"))
    }

    
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(header('Your notes:'))

    loadNotes().forEach((note) => console.log('- ' + note.title) )
}

const removeNote = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => note.title !== title)
    
    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(success('Note: ', title, ' - deleted!'))
    } else {
        console.log(error('Note: ', title, ' - not found!'))
    }

}

const saveNotes = (notes) => {
    const dataJSON =  JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
    
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}