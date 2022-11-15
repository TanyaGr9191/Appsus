import { noteService } from "../services/note.service.js"
import { NoteEdit } from "./note-edit.jsx"
import { NotePreview } from "./note-preview.jsx"

export class NoteList extends React.Component {

    state = {
        notes: []
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query().then(notes =>
            this.setState({ notes: [...notes] })
        )
    }

    removeNote = (noteId) => {
        noteService.removeNote(noteId)
            .then(this.setState({ notes: this.state.notes.filter(note => noteId !== note.id) }))
    }

    addNote = (newNote) => {
        this.setState(prevState => ({ notes: [newNote, ...prevState.notes] }))
    }

    updateNote = (noteId, info, classBgColor) => {

        this.setState(prevState => ({
            notes: prevState.notes.map(note => {

                if (noteId === note.id) {
                    return { id: note.id, type: note.type, isPinned: note.isPinned, info, classBgColor }
                }
                return note
            })
        }))
    }

    render() {

        return <section className="note-list-container">

            <div className="note-add">
                <NoteEdit addNote={this.addNote} />
            </div>

            <div className="note-list" key={Math.random() + Date.now()}>
                {this.state.notes.map(note => {
                    return <NotePreview key={note.id} note={note} removeNote={this.removeNote} updateNote={this.updateNote} />
                })}
            </div>

        </section>
    }
}