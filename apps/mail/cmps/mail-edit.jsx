import { emailService } from "../services/mail.service.js"


export class MailEdit extends React.Component {

    state = {
        email: {
            to: '',
            subject: '',
            body: '',
            isDraft: false
        }
    }


    componentDidMount() {
        if (this.props.email) {
            this.setState({ email: this.props.email })
        }
    }


    clearState = () => {
        this.setState({
            email: {
                to: '',
                subject: '',
                body: '',
            }
        })
    }

    onAdd = (ev) => {
        ev.preventDefault()
        const { email } = this.state
        email.isDraft = false
        this.setState({ email: { ...email, isDraft: false } })
        emailService.save(this.state.email).then((email) => {
            this.setState({ email })
            this.props.onAddEmail(this.state.email)
            this.clearState()
            this.props.onCloseCompose(false)
        })
    }

    handleChange = (ev) => {
        let { value, name } = ev.target
        const field = name
        this.setState((prevState) => ({
            email: {
                ...prevState.email,
                [field]: value
            }
        }))
    }

    closeCompose = (ev) => {
        ev.preventDefault()
        const { email } = this.state
        email.isDraft = true
        this.setState({ email: { ...email, isDraft: true } })
        emailService.save(this.state.email).then((email) => {
            this.setState({ email })
            if(this.props.status !== 'Draft'){
                this.clearState()
            }
            this.props.onCloseCompose(false)
        })
    }

    render() {
        const { to, subject, body } = this.state.email
        const { handleChange, onAdd, closeCompose } = this


        return <section className={`mail-edit ${this.props.isCompose && 'compose-open'}`}>
            <div className="mail-edit-header">
                <span>New Message</span>
                <button onClick={closeCompose}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="mail-edit-body">
                <form className="compose-form" onSubmit={onAdd}>
                    <div className="mail-edit-input-container">
                        <label htmlFor="to">To</label>
                        <input type="text" name="to"
                            value={to}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mail-edit-input-container">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" name="subject"
                            value={subject}
                            onChange={handleChange}
                        />
                    </div >
                    <label htmlFor="body"></label>
                    <textarea type='text' name="body"
                        value={body}
                        onChange={handleChange}
                    ></textarea>
                    <button>Send</button>
                </form>

            </div>
        </section>
    }
}


