"use client";

import styles from "@/app/engine/css/NodeDraggable.module.css"
import React from "react";
import { NodeData, ThemeType } from "@/app/engine/Engine";

//======================================================================================
interface NodeDraggableProps {
    data: NodeData;
    icon: React.ReactNode;
    evtOnClick: () => void;
    isPending: boolean;
    theme?: ThemeType;
}

//======================================================================================
export default function NodeDraggable({
                                          data,
                                          icon: sidebarIcon,
                                          evtOnClick,
                                          isPending,
                                          theme = 'dark'
                                      }: NodeDraggableProps) {

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
            className={`${styles.container} ${isPending ? styles.pending : ''}`}
            draggable
            onDragStart={eventOnDragStart}
            onClick={evtOnClick}
        >
            <div className={styles.iconWrapper}>
                {sidebarIcon}
            </div>
            <span className={styles.label}>{data.label}</span>
        </div>
    );
}