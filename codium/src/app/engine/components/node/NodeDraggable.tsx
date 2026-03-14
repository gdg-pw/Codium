import styles from "@/app/engine/css/NodeDraggable.module.css"
import React from "react";
import {NodeData} from "@/app/engine/Engine";
//======================================================================================
interface NodeDraggableProps {
    data: NodeData;
    icon: React.ReactNode;
    evtOnClick: () => void;
    isPending: boolean;
}
//======================================================================================
export default function NodeDraggable({ data, icon: sidebarIcon, evtOnClick, isPending }: NodeDraggableProps) {
    const eventOnDragStart = (evt: React.DragEvent) => {
        const dragData = {
            type: data.type,
            label: data.label,
            iconFile: data.iconFile
        };


        evt.dataTransfer.setData('application/reactflow', JSON.stringify(dragData));
        evt.dataTransfer.effectAllowed = 'move';
    };
    //---------------------------------------
    return (
        <div
            className={styles.container} //css module
            draggable
            onDragStart={eventOnDragStart}
            onClick={evtOnClick}
            style={{
                background: isPending ? "red" : "",
                cursor: "pointer"
            }}
        >
            {sidebarIcon}
            {data.label}
        </div>
    );
}