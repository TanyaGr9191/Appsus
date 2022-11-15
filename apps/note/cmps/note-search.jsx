export class NoteSearch extends React.Component {

    state = {
        filterBy: ''
    }

    // Filter updates each typing
    handleChnage = ({ target }) => {
        const { value } = target

        this.setState({ filterBy: value }), () => this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        return <section className="note-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search" placeholder="Search" value={this.state.filterBy} onChange={this.handleChnage} />
        </section>
    }
}