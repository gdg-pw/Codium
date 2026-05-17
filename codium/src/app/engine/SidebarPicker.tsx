"use client";

import React, { useState } from 'react';
import Image from "next/image";
import style from "@/app/engine/css/SidebarPicker.module.css";
import NodeDraggable from "@/app/engine/components/node/NodeDraggable";
import { NodeData } from "@/app/engine/Engine";
import { blocksRegistry } from "@/app/blocks/BlocksRegistry";

const CATEGORY_ICON: Record<string, string> = {
    math:  "/dog.svg",
    logic: "/cat.svg",
    flow:  "/dog.svg",
};

const NODE_CATEGORIES: Record<string, NodeData[]> = {};

for (const block of Object.values(blocksRegistry)) {
    const category = block.category.charAt(0).toUpperCase() + block.category.slice(1);
    if (!NODE_CATEGORIES[category]) NODE_CATEGORIES[category] = [];
    NODE_CATEGORIES[category].push({
        type:     block.id,
        label:    block.name,
        iconFile: CATEGORY_ICON[block.category] ?? "/dog.svg",
    });
}

type CategoryKey = keyof typeof NODE_CATEGORIES;

interface SidebarPickerProps {
    pendingNodeToAdd: NodeData | null;
    setPendingNodeToAdd: React.Dispatch<React.SetStateAction<NodeData | null>>;
}

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