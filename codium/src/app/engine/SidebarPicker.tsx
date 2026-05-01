"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from "next/image";
import style from "@/app/engine/css/SidebarPicker.module.css";
import NodeDraggable from "@/app/engine/components/node/NodeDraggable";
import { NodeData, ThemeType } from "@/app/engine/Engine";
import {CategoryIcon} from "@/app/engine/components/DynamicNodeIcon";

//======================================================================================
const NODE_CATEGORIES = {
    "Logic": [
        { type: "gate1", label: "C1_Test1", iconFile: "/dog.svg" },
        { type: "gate2", label: "C1_Test2", iconFile: "/cat.svg" },
    ],
    "Math": [
        { type: "math1", label: "C2_Test1", iconFile: "/dog.svg" },
        { type: "math2", label: "C2_Test2", iconFile: "/cat.svg" },
    ],
    "Whatever": [
        { type: "whatever1", label: "C3_Test1", iconFile: "/dog.svg" },
    ]
};

type CategoryKey = keyof typeof NODE_CATEGORIES;

//======================================================================================
interface SidebarPickerProps {
    pendingNodeToAdd: NodeData | null;
    setPendingNodeToAdd: React.Dispatch<React.SetStateAction<NodeData | null>>;
    theme?: ThemeType;
}

//======================================================================================
export default function SidebarPicker({ pendingNodeToAdd, setPendingNodeToAdd, theme = 'dark' }: SidebarPickerProps) {
    const categories = Object.keys(NODE_CATEGORIES) as CategoryKey[];
    const [activeTab, setActiveTab] = useState<CategoryKey>(categories[0]);

    //scaling logic
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback((e: MouseEvent) => {
        if (isResizing) {
            //width: min 150px, max 600px
            const newWidth = e.clientX;
            if (newWidth >= 150 && newWidth <= 600) {
                setSidebarWidth(newWidth);
            }
        }
    }, [isResizing]);

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResizing);
        }
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
        };
    }, [isResizing, resize, stopResizing]);
    // ------------------------------------

    const handleNodeClick = (item: NodeData) => {
        if (pendingNodeToAdd?.type === item.type) {
            setPendingNodeToAdd(null);
        } else {
            setPendingNodeToAdd({ type: item.type, label: item.label, iconFile: item.iconFile });
        }
    };

    return (
        <div
            className={`${style.sidebarPicker} ${isResizing ? style.resizing : ''}`}
            style={{ width: `${sidebarWidth}px` }}
        >
            {/* tab navbar */}
            <div className={style.tabBar}>
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`${style.tabButton} ${activeTab === category ? style.active : ''}`}
                        onClick={() => setActiveTab(category)}
                        title={category}
                    >
                        {/* dynamic theme colored svg icon */}
                        <CategoryIcon category={category} />
                        <span className={style.tabLabel}>{category}</span>
                    </button>
                ))}
            </div>

            {/* tab content */}
            <div className={style.tabContent}>
                <div className={style.itemGrid}>
                    {NODE_CATEGORIES[activeTab].map((item: NodeData) => (
                        <NodeDraggable
                            data={item}
                            key={item.label}
                            icon={<Image src={item.iconFile} alt={item.label} width={30} height={30}/>}
                            isPending={pendingNodeToAdd?.type === item.type}
                            evtOnClick={() => handleNodeClick(item)}
                            theme={theme}
                        />
                    ))}
                </div>
            </div>

            {/* size change handle */}
            <div
                className={style.resizer}
                onMouseDown={startResizing}
            />
        </div>
    );
}