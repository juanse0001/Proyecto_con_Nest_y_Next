import Navbar from "../components/navbar";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <Navbar />
            <main className={styles.main}>
                <h1>Welcome to the Home Page</h1>
            </main>
            <footer className={styles.footer}>
                <p>© 2024 My Application</p>
            </footer>
        </div>
    );
}
