"use client";

import React, { useState } from 'react';
import Image from "next/image";
import style from "@/app/engine/css/SidebarPicker.module.css";
import NodeDraggable from "@/app/engine/components/node/NodeDraggable";
import {NodeData} from "@/app/engine/Engine";
//======================================================================================
//======================================================================================
const NODE_CATEGORIES = {
    "Logical": [
        { type: "gate1", label: "C1_Test1", iconFile: "/dog.svg" },
        { type: "gate2", label: "C1_Test2", iconFile: "/cat.svg" },
    ],
    "Mathematical": [
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
}
//======================================================================================
export default function SidebarPicker({ pendingNodeToAdd, setPendingNodeToAdd }: SidebarPickerProps) {
    const categories = Object.keys(NODE_CATEGORIES) as CategoryKey[];
    const [activeTab, setActiveTab] = useState<CategoryKey>(categories[0]);

    const handleNodeClick = (item: NodeData) => {
        if (pendingNodeToAdd?.type === item.type) {
            setPendingNodeToAdd(null);
        } else {
            setPendingNodeToAdd({ type: item.type, label: item.label, iconFile: item.iconFile });
        }
    };

    return (
        <div className={style.sidebarPicker}>
            {/* tab navbar */}
            <div className={style.tabBar}>
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`${style.tabButton} ${activeTab === category ? style.active : ''}`}
                        onClick={() => setActiveTab(category)}
                    >
                        {category}
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
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}