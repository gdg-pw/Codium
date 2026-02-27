import styles from "../css/sidebar.module.css"

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.group}>
                <h2 className={styles.title}>Zadanie: Napisanie strony internetowej do nauki algorytmów i struktur
                    danych</h2>
                <p className={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam soluta repellendus sit qui
                    nesciunt
                    sunt praesentium, voluptatibus quibusdam, distinctio quo libero molestiae ipsam necessitatibus animi
                    dicta molestias. Eveniet, repellat quisquam.
                </p>
                <ul className={styles.objectives}>
                    <li>zadanie 1</li>
                    <li>zadanie 2</li>
                    <li>zadanie 3</li>
                    <li>zadanie 4</li>
                    <li>zadanie 5</li>
                    <li>zadanie 5</li>
                    <li>zadanie 5</li>
                    <li>zadanie 5</li>
                    <li>zadanie 5</li>
                </ul>
            </div>
        </aside>
    )
}