import styles from "./css/editorPage.module.css"
import TopBar from "@/app/editorPage/topbar/topBar";
import Sidebar from "@/app/editorPage/mainContent/sidebar";
import GameBoard from "@/app/editorPage/mainContent/gameBoard";

export default function EditorPage() {
    return (
        <main className={styles.editorPage}>
            <TopBar/>
            <div className={styles.wrapper}>
                <Sidebar />
                <GameBoard />
            </div>

        </main>
    );
}