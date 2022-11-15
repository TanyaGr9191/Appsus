const { Link } = ReactRouterDOM

export function AppList() {
    return <section className="app-list">
        <Link to="/mail">Mail</Link>
        <Link to="/note">Notes</Link>
    </section>
}