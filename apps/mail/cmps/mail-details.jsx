
export function EmailDetails({ email }) {

    return <section className="mail-details">
        <div className="mail-details-header">
            <span>from: {email.from}</span>
            <span>to: {email.to}</span>
        </div>
        <div className="mail-details-body">
            <span>
                {email.body}
            </span>
        </div>
    </section>
}