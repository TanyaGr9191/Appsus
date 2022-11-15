import { emailService } from "../services/mail.service.js";
import { EmailPreview } from "./mail-preview.jsx"

export class MailList extends React.Component {

    state = {
        logggedinUser: emailService.getLoggedinUser() || {},
        emails: []
    }

    componentDidMount() {
        //For loading mock
        setTimeout(() => {
            this.setState({ emails: this.props.emails })
        }, 2000);
    }


    emails = () => {
        return this.props.emails.map(email =>
            <li key={email.id} className={`${email.isRead && "not-read"}`}>
                <EmailPreview email={email}
                    logggedinUser={this.state.logggedinUser}
                    filterBy={this.props.filterBy}
                    onOpenCompose={this.props.onOpenCompose}
                    onCloseCompose={this.props.onCloseCompose}
                    isCompose={this.props.isCompose}
                    onAddEmail={this.props.onAddEmail}
                    onRemoveEmail={this.props.onRemoveEmail}
                    onReadEmail={this.props.onReadEmail}
                    onNotReadEmail={this.props.onNotReadEmail}
                    onStaredEmail={this.props.onStaredEmail}
                />
            </li>
        )
    }

    render() {
        return <section className="mail-list">
            <ul>
                {this.emails()}
            </ul>
        </section>
    }
}