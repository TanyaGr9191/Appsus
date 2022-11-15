import { EmailDetails } from "./mail-details.jsx"
import { utilService } from "../../../services/util.service.js"
import { emailService } from "../services/mail.service.js"
import { MailEdit } from "./mail-edit.jsx"

export class EmailPreview extends React.Component {

    state = {
        email: this.props.email || {},
        isSelected: false,
    }

    onSelect = (ev, emailId) => {
        ev.stopPropagation()
        this.setState({ isSelected: !this.state.isSelected })
        const { status } = this.props.filterBy
        if (status === 'Inbox' || 'Bin') {
            const { email } = this.state
            email.isRead = true
            this.setState({ email: { ...email, isRead: true } })
            this.props.onReadEmail(emailId)
        }
        if (status === 'Draft') {
            this.setState({ isSelected: true })
            this.props.onOpenCompose()
        }
    }

    onRemove = (ev, emailId) => {
        ev.stopPropagation()
        const { email } = this.state
        email.isRemoved = true
        this.setState({ email: { ...email, isRemoved: true } })
        this.props.onRemoveEmail(emailId)
        this.props.onCloseCompose(false)
    }


    onStared = (ev, emailId) => {
        ev.stopPropagation()
        const { email } = this.state
        email.isRemoved = true
        this.setState({ email: { ...email, isStared: true } })
        this.props.onStaredEmail(emailId)
    }

    setNotReadEmail = (ev, emailId) => {
        ev.stopPropagation()
        const { email } = this.state
        email.isRead = false
        this.setState({ email: { ...email, isRead: false } })
        this.props.onNotReadEmail(emailId)
    }

    render() {
        const { onSelect, onRemove, setNotReadEmail, onStared } = this
        const { isSelected } = this.state
        const { email, filterBy } = this.props
        const { status } = filterBy
        const envelope = email.isRead ? 'envelope-open' : 'envelope'

        return <article className="mail-preview">
            <div className={`mail-preview-container ${!email.isRead && (status !== 'Sent' && status !== 'Draft') && 'not-read'}`} onClick={(ev) => onSelect(ev, email.id)}>
                <span className="fullname">
                    {emailService.getUserName(filterBy, email)}
                </span>
                <span className="subject">{email.subject}</span>
                <span className="sentAt">{utilService.createdAt(email.sentAt)}</span>
                {status !== 'Bin' && status !== 'Draft' && <button className="btn-preview"
                    onClick={(ev) => onStared(ev, email.id)}>
                    <i className="fa-solid fa-star"></i>
                </button>}
                {(status !== 'Sent' && status !== 'Draft') &&
                    <button className="btn-preview"
                        onClick={(ev) => setNotReadEmail(ev, email.id)}>
                        <i className={`fa-solid fa-${envelope}`}></i>
                    </button>
                }
                <button className="btn-preview"
                    onClick={(ev) => onRemove(ev, email.id)}>
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
            {isSelected && status !== 'Draft' && <EmailDetails
                email={email}
            />}
            {isSelected && status === 'Draft' && <MailEdit
                status={status}
                email={email}
                isSelected={isSelected}
                isCompose={this.props.isCompose}
                onCloseCompose={this.props.onCloseCompose}
                onAddEmail={this.props.onAddEmail}
            />}
        </article>
    }
}

