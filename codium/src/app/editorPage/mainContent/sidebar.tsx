'use client'
import {useState} from "react"
import styles from "../css/sidebar.module.css"
import Image from "next/image";

export default function Sidebar() {

    // przykladowe dane
    const initialTasks = [
        { id: 1, label: "Corgi", status: "completed" },
        { id: 2, label: "to", status: "completed" },
        { id: 3, label: "cudowne", status: "active" },
        { id: 4, label: "psy", status: "pending" },
    ];

    const [hasTask, setHasTask] = useState(true)
    const [tasks, setTasks] = useState(initialTasks);

    return (
        <aside className={styles.sidebar}>
            {
                hasTask ? (
                    <div className={styles.group}>
                        <div className={styles.viewForHasTask} >
                            <p className={styles.hasTask}>CURRENT TASK</p>
                        </div>
                        <h1 className={styles.title}>
                            Zadanie: Treść zadania
                        </h1>
                        <p className={styles.description}>
                            Tu powinen znaleźc się szczegółowy opis zadania (...)
                        </p>


                        <div className={styles.taskContainer}>
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`${styles.taskItem} ${styles[task.status]}`}
                                >
                                    <div className={styles.checkCircle}>
                                        {task.status !== 'pending' && (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        )}
                                    </div>
                                    <span className={styles.taskLabel}>{task.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.noTask}>
                        <p>Wszystkie zadania wykonane</p>
                        <p className={styles.noTaskSubsection}>Dobra robota!</p>
                        <Image src="/corgi1.svg" alt="Codium Hero" width={300} height={300} priority />
                    </div>
                )
            }
        </aside>
    )
}