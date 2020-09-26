const { Console } = require('console')
const fs = require('fs')
const chalk = require('chalk')

var error = chalk.red.inverse
var success = chalk.green.inverse
var header = chalk.yellow.inverse

const getNotes = () => {
    console.log('Your notes...')
}

const addNote = (title, body) => {
    
    const notes = loadNotes()

    const duplicateNotes = notes.filter((note) => note.title === title)

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
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
}