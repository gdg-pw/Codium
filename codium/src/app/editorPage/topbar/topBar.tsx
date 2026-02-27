import styles from "../css/topBar.module.css";
import SettingsButton from "@/app/editorPage/topbar/settingsButton";
import ActionButton from "@/app/editorPage/topbar/actionButton";

export default function TopBar() {
    return (
        <>
            <div className={styles.bar}>
                <div className={styles.GDGicon}><span>&lt;/&gt;</span></div>

                <div className={styles.GDGsign}> GDG Codium</div>

                <ActionButton >Quests</ActionButton>

                <ActionButton>Upgrade Tools</ActionButton>

                <SettingsButton />

            </div>
        </>
    );
}