export class TodoList extends React.Component {

    state = {
        label: '',
        todos: []
    }

    componentDidMount() {
        const { note } = this.props

        if (note) {
            this.setState(note.info, this.setLabel)
        }
    }

    setLabel = (ev) => {
        const { note } = this.props
        let value

        if (note) value = note.info.label
        else value = ev.target.value

        this.setState({ label: value },
            () => this.props.setNoteTodoInfo({ label: this.state.label, todos: this.state.todos })
        )
    }

    setTodos = (ev, idx) => {
        const { value } = ev.target
        const { label, todos } = this.state

        if (value !== '') {
            this.setState({
                todos: todos.map((todo, index) => {
                    if (idx === index) {

                        return { txt: value, doneAt: todo.doneAt }
                    }
                    return todo
                })
            }, () => this.props.setNoteTodoInfo({ label, todos: this.state.todos }))

        } else {
            this.removeTodo(idx)
        }
    }

    setTodoDone = (ev, idx) => {
        const { label, todos } = this.state
        const isDone = ev.target.checked ? Date.now() : null

        this.setState({
            todos: todos.map((todo, index) => {
                if (idx === index) {
                    return { txt: todo.txt, doneAt: isDone }
                }
                return todo
            })
        }, () => this.props.setNoteTodoInfo({ label, todos: this.state.todos }))
    }

    addTodo = () => {
        this.setState(prevState => ({ todos: [...prevState.todos, { txt: '', doneAt: null }] }))
    }

    removeTodo = (idx) => {
        this.setState(prevState => ({ todos: prevState.todos.filter((todo, index) => idx !== index) }),
            () => this.props.setNoteTodoInfo({ label: this.state.label, todos: this.state.todos })
        )
    }

    render() {

        return <section className="todo-list">

            <input id="todo-list-title" type="text" placeholder="Title" onChange={this.setLabel} value={this.state.label} />
            <br></br>

            <ul>
                {this.state.todos.map((todo, idx) => {
                    return <li key={idx}>
                        <input type="checkbox" onChange={(ev) => this.setTodoDone(ev, idx)} checked={todo.doneAt !== null} />
                        <input type="text" placeholder="Todo..." value={todo.txt} onChange={(ev) => this.setTodos(ev, idx)} />
                        <button id="todo-list-remove-btn" onClick={() => this.removeTodo(idx)}><i className="fa-solid fa-xmark"></i></button>
                    </li>
                })}
            </ul>

            <button id="todo-list-add-btn" onClick={this.addTodo}><i className="fa-solid fa-plus"></i></button>
        </section >
    }

}