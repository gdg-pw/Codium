import styles from "./css/editorPage.module.css"
import TopBar from "@/app/editorPage/topbar/topBar";
import Sidebar from "@/app/editorPage/mainContent/sidebar";
import GameBoard from "@/app/editorPage/mainContent/gameBoard";
import {Box} from "@mui/material";

export default function EditorPage() {
    return (
        <main className={styles.editorPage}>
            <TopBar/>
            <Box className={styles.colorBar} />
                <div className={styles.wrapper}>
                    <Sidebar />
                    <GameBoard />
                </div>
        </main>
    );
}