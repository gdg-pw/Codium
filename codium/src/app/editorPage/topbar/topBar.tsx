import styles from "../css/topBar.module.css";
import SettingsButton from "@/app/editorPage/topbar/settingsButton";
import ActionButton from "@/app/editorPage/topbar/actionButton";
import Image from "next/image";

export default function TopBar() {
    return (
        <>
            <div className={styles.bar}>
                <div className={styles.GDGicon}><Image src="/gdg_logo.svg" alt="Codium Logo" width={80} height={80} /></div>

                <div className={styles.GDGsign}>GDG Codium</div>

                <ActionButton highlightColor="green">QUESTS</ActionButton>

                <ActionButton >TOOLS</ActionButton>

                <SettingsButton />

            </div>
        </>
    );
}