

export function MailStatus({ status }) {

    return <i className={`fa-solid fa-${getIcon(status)}`}></i>

}

function getIcon(status) {
    switch (status) {
        case 'Inbox':
            return 'inbox'
        case 'Stared':
            return 'star'
        case 'Sent':
            return 'paper-plane'
        case 'Draft':
            return 'file'
        case 'Bin':
            return 'trash-can'
    }
}

