import styles from "./css/NodeDraggable.module.css"

export default function NodeDraggable({title, type, icon: sidebarIcon}) {
    const eventOnDragStart = (evt) => {
        evt.dataTransfer.setData('application/reactflow', {type}["type"]);
        evt.dataTransfer.effectAllowed = 'move';
    };
    //---------------------------------------
    return (
        <div
            className={styles.container} //css module
            draggable
            onDragStart={eventOnDragStart}
        >
            {sidebarIcon}
            {title}
        </div>
    );
}