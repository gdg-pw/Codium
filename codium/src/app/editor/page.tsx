import styles from "./css/editor.module.css"
import TopBar from "@/editor/topbar/topBar";
import Sidebar from "@/editor/mainContent/sidebar";
import GameBoard from "@/editor/mainContent/gameBoard";

export default function EditorPage() {
    return (
        <main className={styles.editor}>
            <TopBar/>
            <div className={styles.wrapper}>
                <Sidebar />
                <GameBoard />
            </div>

        </main>
    );
}