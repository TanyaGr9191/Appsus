import { AppList } from "../cmps/app-list.jsx"


export function Home() {

    return <section className="home">
        <div>
            <h1>Welcome to Appsus!</h1>
            <p>Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Natus error optio ad delectus reprehenderit! Cupiditate quod animi accusantium asperiores odit.</p>
            <AppList />
        </div>
    </section>
}