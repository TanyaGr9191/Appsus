const { Link, NavLink, withRouter } = ReactRouterDOM

export function AppHeader() {
    return <header className="app-header">
        <Link to="/">
            <div className="logo-container">
            <img src='assets/img/logo.png' alt="" />
            <h3>APPSUS</h3>
            </div>
        </Link>
        <nav>
            <NavLink exact to="/">Home</NavLink>
            {/* <NavLink to="/about">About</NavLink> */}
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Notes</NavLink>
        </nav>
    </header>
}
