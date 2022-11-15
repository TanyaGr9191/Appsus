import { MailEdit } from '../cmps/mail-edit.jsx'
import { MailStatus } from '../cmps/mail-status.jsx'
import { emailService } from '../services/mail.service.js'

export class MailOptions extends React.Component {

    state = { currStatus: 'Inbox' }
    onStatus = (status) => {
        console.log('on set status', status);
        this.props.onSetStatus(status)
    }


    handleSetStatus = (status) => {
        this.setState({ currStatus: status })
        this.onStatus(status)
    }

    render() {
        const { onStatus } = this
        const { options, onOpenCompose, isCompose, onCloseCompose } = this.props


        return <section className="option-list">
            <button className="btn-mail-compose" onClick={onOpenCompose}>
                <i className="fa-solid fa-pencil"></i><span>Compose</span>
            </button>
            {
                <span><MailEdit onAddEmail={this.props.onAddEmail}
                    isCompose={isCompose}
                    onCloseCompose={onCloseCompose} />
                </span>
            }
            <ul>
                {options.map(status => {
                    return <li className={`selected ${this.state.currStatus === status && 'option-selected'}`}
                        onClick={() => { this.handleSetStatus(status) }} key={status}>
                        <div className="left">
                            <MailStatus status={status} />
                            <span >{status}</span>
                        </div>
                        {status === 'Inbox' && <span className="status-amount">{emailService.getNotReadInboxEmails(this.props.emails)}</span>}
                        {status === 'Stared' && <span className="status-amount">{emailService.getNotReadStaredEmails(this.props.emails)}</span>}
                        {status === 'Bin' && <span className="status-amount">{emailService.getNotReadBinEmails(this.props.emails)}</span>}
                    </li>
                })}
            </ul>
        </section>
    }
}