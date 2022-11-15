import { storageService } from "./storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const noteService = {
    query,
    getRemovedNotes,
    getNoteById,
    updateNote,
    addNote,
    removeNote
}

const NOTES_KEY = 'notesDB'
const REMOVED_KEY = 'removedNotesDB'

let gNotes = _loadFromStorage(NOTES_KEY) || _getNotes()
let gRemovedNotes = _loadFromStorage(REMOVED_KEY) || []

function query() {
    _saveToStorage(NOTES_KEY, gNotes)

    return Promise.resolve(gNotes)
}

function getRemovedNotes() {
    return Promise.resolve(gRemovedNotes)
}

function getNoteById(noteId) {
    if (!noteId) return Promise.resolve(null)
    const note = gNotes.find(note => noteId === note.id)
    return Promise.resolve(note)
}

function updateNote(updatedNote) {
    gNotes = gNotes.map(note => note.id === updatedNote.id ? updatedNote : note)
    _saveToStorage(NOTES_KEY, gNotes)
    return Promise.resolve(updatedNote)
}

function addNote(type, info, classBgColor) {
    const newNote = {
        id: utilService.makeId(),
        type,
        isPinned: false,
        info,
        classBgColor
    }

    gNotes.unshift(newNote)
    _saveToStorage(NOTES_KEY, gNotes)

    return Promise.resolve(newNote)
}

function removeNote(noteId) {
    // add removed note to array - gRemovedNotes
    _addRemovedNoteToStorage(noteId)

    // remove note from array - gNotes
    gNotes = gNotes.filter(note => noteId !== note.id)
    _saveToStorage(NOTES_KEY, gNotes)

    return Promise.resolve()
}

function _addRemovedNoteToStorage(noteId) {

    getNoteById(noteId).then(note => {
        gRemovedNotes.unshift(note)
        _saveToStorage(REMOVED_KEY, gRemovedNotes)
    })
}

function _getNotes() {
    return [
        {
            id: 'n101',
            type: 'note-img',
            isPinned: false,
            info: {
                url: 'https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
                title: 'My breakfast:'
            },
            classBgColor: 'bg-pink'
        },
        {
            id: 'n102',
            type: 'note-todos',
            isPinned: false,
            info: {
                label: 'Summer activities🪁',
                todos: [
                    { txt: 'Have a Picnic', doneAt: null },
                    { txt: 'Attend a Parade', doneAt: 187111111 },
                    { txt: 'Pick Strawberries🍓', doneAt: null },
                    { txt: 'Attend an Outdoor Concert', doneAt: null }
                ]
            },
            classBgColor: 'bg-green'
        },
        {
            id: 'n103',
            type: 'note-txt',
            isPinned: false,
            info: {
                txt: '👩🏻‍💻Knowledge is power!'
            },
            classBgColor: 'bg-white'
        },
        {
            id: 'n104',
            type: 'note-todos',
            isPinned: false,
            info: {
                label: 'Todo list',
                todos: [
                    { txt: 'Writing and testing code for new programs', doneAt: 187111111 },
                    { txt: 'Updating existing programs', doneAt: null },
                    { txt: 'Identifying and correcting coding errors', doneAt: null },
                    { txt: 'Rewriting programs for different operating systems', doneAt: 187111111 },
                    { txt: 'Secure programs against cybersecurity threats', doneAt: null }
                ]
            },
            classBgColor: 'bg-blue'
        },
        {
            id: 'n105',
            type: 'note-img',
            isPinned: false,
            info: {
                url: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
                title: 'Bobi and Me!'
            },
            classBgColor: 'bg-yellow'
        },
        {
            id: 'n106',
            type: 'note-todos',
            isPinned: false,
            info: {
                label: 'Get my stuff together',
                todos: [
                    { txt: 'Driving liscence', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }
                ]
            },
            classBgColor: 'bg-white'
        },
        {
            id: 'n107',
            type: 'note-txt',
            isPinned: false,
            info: {
                txt: '“We cannot solve problems with the kind of thinking we employed when we came up with them.” — Albert Einstein'
            },
            classBgColor: 'bg-orange'
        },
    ]
}

function _saveToStorage(STORAGE_KEY, notes) {
    storageService.saveToStorage(STORAGE_KEY, notes)
}

function _loadFromStorage(STORAGE_KEY) {
    return storageService.loadFromStorage(STORAGE_KEY)
}