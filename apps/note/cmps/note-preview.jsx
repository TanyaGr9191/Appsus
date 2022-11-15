import { noteService } from "../services/note.service.js"
import { NoteColorPalette } from "./note-color-palette.jsx"
import { NoteEdit } from "./note-edit.jsx"

export class NotePreview extends React.Component {

    state = {
        note: this.props.note,
        isOnEdit: false,
        paletteIsHidden: true
    }

    componentDidMount() {
        document.addEventListener('click', this.closePaletteColor)
    }

    // opens NoteEdit Modal
    editNote = () => {
        this.setState({ isOnEdit: true })
    }

    openPaletteColor = (ev) => {
        ev.stopPropagation()
        const { paletteIsHidden } = this.state
        this.setState({ paletteIsHidden: !paletteIsHidden })
    }

    changeNoteColor = (ev) => {
        ev.stopPropagation()
        const { className } = ev.target
        this.setState(prevState => ({ note: { ...prevState.note, classBgColor: className } }),
            () => { noteService.updateNote(this.state.note) }
        )
    }

    closePaletteColor = () => {
        this.setState({ paletteIsHidden: true })
    }

    closeEditModal = () => {
        this.setState({ isOnEdit: false })
    }

    render() {
        const { note, isOnEdit, paletteIsHidden } = this.state

        return <section className={`note-preview ${note.classBgColor}`}>
            <button className="pin-note"><i className="fa-solid fa-thumbtack"></i></button>

            {note.type === 'note-txt' && <p>{note.info.txt}</p>}
            {note.type === 'note-img' &&
                <div>
                    <p>{note.info.title}</p>
                    <img src={note.info.url} />
                </div>
            }
            {note.type === 'note-todos' &&
                <div>
                    <p>{note.info.label}</p>
                    <ul>
                        {note.info.todos.map((todo, idx) => {
                            return <li key={idx} className={todo.doneAt ? 'done' : ''}>{todo.txt}</li>
                        })}
                    </ul>

                </div>
            }

            <div className="edit">
                <button title="Edit note" onClick={this.editNote}><i className="fa-solid fa-pen-to-square"></i></button>

                {isOnEdit &&
                    <div className={`note-edit ${note.classBgColor}`}>
                        <NoteEdit note={note} closeEditModal={this.closeEditModal} updateNote={this.props.updateNote} />
                    </div>
                }

                <div className="color-palette-dropdown">
                    <button title="Background options" onClick={this.openPaletteColor}><i className="fa-solid fa-palette"></i></button>
                    <NoteColorPalette paletteIsHidden={paletteIsHidden} changeNoteColor={this.changeNoteColor} />
                </div>

                <button title="Delete note" onClick={() => this.props.removeNote(note.id)}><i className="fa-solid fa-trash"></i></button>
            </div>

        </section>
    }
}