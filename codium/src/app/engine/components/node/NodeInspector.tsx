"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Node, useReactFlow } from '@xyflow/react';
//-------------------------------------------------------
import { NodeData, ThemeType } from "@/app/engine/Engine";
import styles from "@/app/engine/css/NodeInspector.module.css"

//======================================================================================
interface NodeInspectorProps {
    node: Node<NodeData>;
    setSelectedNode: React.Dispatch<React.SetStateAction<Node<NodeData> | null>>;
    theme?: ThemeType;
}

//======================================================================================
export default function NodeInspector({ node, setSelectedNode, theme = 'dark' }: NodeInspectorProps) {
    const { setNodes, setEdges } = useReactFlow();

    const [inspectorWidth, setInspectorWidth] = useState(320);
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback((e: MouseEvent) => {
        if (isResizing) {
            //panel is on the right size so panel_width = width - mouse.x
            const newWidth = window.innerWidth - e.clientX;

            if (newWidth >= 200 && newWidth <= 600) {
                setInspectorWidth(newWidth);
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

    if (!node) return null;
    // =================================================================
    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLabel = e.target.value;

        setNodes((nds) =>
            nds.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, label: newLabel } } : n))
        );

        setSelectedNode((prevNode) => {
            if (!prevNode) return null;
            return {
                ...prevNode,
                data: {
                    ...prevNode.data,
                    label: newLabel
                }
            };
        });
    };

    // =================================================================
    function evtButtonDelete() {
        setNodes((nds) => nds.filter((n) => n.id !== node.id));
        setEdges((eds) => eds.filter((edge) => edge.source !== node.id && edge.target !== node.id));
        setSelectedNode(null);
    }

    function evtButtonCopy() {
        // TODO: copy logic
    }

    function evtClose() {
        setSelectedNode(null);
    }
    // =================================================================
    return (
        <div
            className={`${styles.container} ${isResizing ? styles.resizing : ''}`}
            style={{ width: `${inspectorWidth}px` }}
        >
            {/* change size handle */}
            <div
                className={styles.resizer}
                onMouseDown={startResizing}
            />

            {/* header */}
            <div className={styles.header}>
                <h4 className={styles.title}>Properties</h4>
                <button className={styles.closeBtn} onClick={evtClose} title="Close inspector">
                    ✕
                </button>
            </div>

            {/* properties */}
            <div className={styles.section}>
                <label className={styles.label}>Name</label>
                <input
                    type="text"
                    value={node.data.label || ''}
                    onChange={handleLabelChange}
                    className={styles.input}
                    placeholder="Enter node name..."
                />
            </div>

            {/* actions*/}
            <div className={styles.section}>
                <div className={styles.actionRow}>
                    <button className={styles.btnSecondary} onClick={evtButtonCopy}>
                        Copy
                    </button>
                    <button className={styles.btnDanger} onClick={evtButtonDelete}>
                        Delete
                    </button>
                </div>
            </div>

            {/* unused buttons for now */}
            <div className={styles.section}>
                <label className={styles.label}>Advanced Options</label>
                <div className={styles.buttonGrid}>
                    <button className={styles.btnTool}>Some</button>
                    <button className={styles.btnTool}>Other</button>
                    <button className={styles.btnTool}>Buttons</button>
                    <button className={styles.btnTool}>That</button>
                    <button className={styles.btnTool}>Dont</button>
                    <button className={styles.btnTool}>Work</button>
                </div>
            </div>

            {/* footer */}
            <div className={styles.footer}>
                <span className={styles.idLabel}>ID:</span> {node.id}
            </div>
        </div>
    );
}