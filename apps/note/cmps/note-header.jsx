import { NoteSearch } from "./note-search.jsx"

export function NoteHeader(onSetFilter) {

    return <section className="note-header">
        <div className="logo">
            <img src="https://logotyp.us/files/keep.svg" />
            <p>Keep</p>
        </div>
        <NoteSearch onSetFilter={onSetFilter}/>
    </section>
}