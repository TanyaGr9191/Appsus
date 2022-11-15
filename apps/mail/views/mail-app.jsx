import { MailList } from "../cmps/mail-list.jsx"
import { MailHeaderContainer } from "../cmps/mail-header-container.jsx";
import { MailFilter } from "../cmps/mail-filter.jsx";
// import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/mail.service.js'

export class MailApp extends React.Component {

    state = {
        emails: [],
        filterBy: emailService.getCriteria(),
        isCompose: false,
    }

    componentDidMount() {
        this.loadEmails()
    }

    loadEmails = () => {
        emailService.query(this.state.filterBy).then((emails) => {
            this.setState({ emails })
        })
    }

    onAddEmail = (newEmail) => {
        this.setState({ newEmail }, () => {
            this.loadEmails()
        })
    }

    onRemoveEmail = (emailId) => {
        const { status } = this.state.filterBy
        if (status === 'Bin') {
            emailService.removefromEmail(emailId).then(() => {
                const emails = this.state.emails.filter(email => email.id !== emailId)
                this.setState({ emails })
            })
        } else {
            emailService.removetoBin(emailId).then(() => {
                const emails = this.state.emails.filter(email => email.id !== emailId)
                this.setState({ emails })
            })
        }
    }

    onStaredEmail = (emailId) => {
        emailService.setIsStared(emailId).then(this.loadEmails())
    }

    onReadEmail = (emailId) => {
        emailService.setAsRead(emailId).then(this.loadEmails())
    }

    onNotReadEmail = (emailId) => {
        emailService.setIsRead(emailId).then(this.loadEmails())
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadEmails)
    }

    onOpenCompose = () => {
        this.state.isCompose = true
        this.setState({ isCompose: true })
        this.loadEmails()
    }

    onCloseCompose = (updatedIsCompose) => {
        this.setState({ isCompose: updatedIsCompose })
        this.loadEmails()
    }

    render() {
        const { emails, filterBy, isCompose } = this.state
        const { onRemoveEmail, onAddEmail,
            onSetFilter, onOpenCompose,
            onCloseCompose, onReadEmail,
            onNotReadEmail, onStaredEmail} = this

        return <div className="mail-app-container">
            <MailHeaderContainer />
            <main className="mail-container">
                <MailFilter
                    filterBy={this.state.filterBy}
                    onSetFilter={onSetFilter}
                    onAddEmail={onAddEmail}
                    onOpenCompose={onOpenCompose}
                    onCloseCompose={onCloseCompose}
                    isCompose={isCompose}
                    emails={emails} />
                <MailList filterBy={filterBy}
                    emails={emails}
                    onOpenCompose={onOpenCompose}
                    onCloseCompose={onCloseCompose}
                    isCompose={isCompose}
                    onRemoveEmail={onRemoveEmail}
                    onAddEmail={onAddEmail}
                    onReadEmail={onReadEmail}
                    onNotReadEmail={onNotReadEmail}
                    onStaredEmail={onStaredEmail}
                />
            </main>
        </div>
    }

}
