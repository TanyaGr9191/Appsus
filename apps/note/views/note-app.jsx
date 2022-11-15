import { NoteHeader } from "../cmps/note-header.jsx"
import { NoteList } from "../cmps/note-list.jsx"

export class NoteApp extends React.Component {

    render() {

        return <section className="note-app menu-opened ">
            <div className="main-screen full" ></div>
            <NoteHeader />
            <NoteList />
            {/* <NoteHeader onSetFilter={this.onSetFilter} />
            <NoteList note={this.state.notes} /> */}
        </section>
    }

}