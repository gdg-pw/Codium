"use client";
//======================================================================================
import React, { useState, useCallback, useRef } from 'react';
import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    useReactFlow,
    ReactFlowProvider, ConnectionLineType, Controls, OnNodesChange, OnEdgesChange, Edge, XYPosition, Node
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Background, BackgroundVariant } from '@xyflow/react';
//-------------------------------------------------------
import ExampleNode from '@/app/engine/components/node/items/ExampleNode';
import AnimatedEdge from "@/app/engine/components/WireEdge";
import SidebarPicker from "@/app/engine/SidebarPicker";
import NodeInspector from "@/app/engine/components/node/NodeInspector";
//-------------------------------------------------------
import style from "@/app/engine/css/Engine.module.css"
import "@/app/engine/css/theme.module.css";
import { initialEdges, initialNodes } from "@/app/engine/TestLevel";
import WireEdge from "@/app/engine/components/WireEdge";
//======================================================================================
export type NodeData = {
    label: string;
    iconFile: string;
    type: string;
}
//-------------------------------------------------------
export type ThemeType = 'light' | 'dark';
//-------------------------------------------------------
interface EngineProps {
    pendingNodeToAdd: NodeData | null;
    setPendingNodeToAdd: (node: NodeData | null) => void;
    theme?: ThemeType;
}
//-------------------------------------------------------
const edgeTypes = {
    wire: WireEdge,
};
//-------------------------------------------------------
const nodeTypes = {
    test1: ExampleNode,
    gate1: ExampleNode,
    gate2: ExampleNode,
    math1: ExampleNode,
    math2: ExampleNode,
    whatever1: ExampleNode,
};
//======================================================================================
//======================================================================================
function Engine({ pendingNodeToAdd, setPendingNodeToAdd, theme = 'dark' }: EngineProps) {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const { screenToFlowPosition } = useReactFlow();
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const ref = useRef(null);
    //-------------------------------------------------------
    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );

    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params: never) => setEdges((eds) => addEdge(params, eds)),
        [],
    );
    //-------------------------------------------------------
    function makeFromNodeData(parsedData: NodeData, translatedPosition: XYPosition) {
        const node: Node = {
            id: `${parsedData.type}_node_${Date.now()}`,
            type: parsedData.type,
            position: translatedPosition,
            data: {
                label: parsedData.label,
                iconFile: parsedData.iconFile
            }
        };
        return node;
    }

    //when dragged, drop the node where mouse cursor is
    const evtOnDrop = useCallback(
        (evt: React.DragEvent) => {
            evt.preventDefault();

            const dragDataString = evt.dataTransfer.getData("application/reactflow");
            let parsedData;
            try {
                parsedData = JSON.parse(dragDataString);
            } catch (e) {
                return;
            }

            const translatedPosition = screenToFlowPosition({
                x: evt.clientX,
                y: evt.clientY,
            });

            const node = makeFromNodeData(parsedData, translatedPosition);

            setNodes((nds) => [...nds, node]) //add the node
        },
        [screenToFlowPosition],
    );

    const evtOnDragOver = (evt: React.DragEvent) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "move";
    };

    const evtOnNodeClicked = (evt: React.MouseEvent, clickedNode: Node) => {
        evt.preventDefault();

        setNodes((nds) =>
            nds.map((node) => ({
                ...node,
                style: {
                    ...node.style,
                    border: node.id === clickedNode.id ? "2px solid var(--engine-accent)" : "2px solid transparent",
                    boxShadow: node.id === clickedNode.id ? "0 0 0 4px color-mix(in srgb, var(--engine-accent) 20%, transparent)" : "none",
                    borderRadius: "12px",
                    transition: "border 0.2s ease, box-shadow 0.2s ease"
                },
            }))
        );

        setSelectedNode(clickedNode);
    };

    const evtOnPaneClick = useCallback((evt: React.MouseEvent) => {
        evt.preventDefault();

        //deselect nodes
        setNodes((nds) => nds.map((node) => ({
            ...node,
            style: { ...node.style, border: "2px solid transparent", boxShadow: "none" }
        })));

        setSelectedNode(null);

        if (pendingNodeToAdd) {
            const translatedPosition = screenToFlowPosition({
                x: evt.clientX,
                y: evt.clientY,
            });

            const node = makeFromNodeData(pendingNodeToAdd, translatedPosition);
            setNodes((nds) => [...nds, node]);
            setPendingNodeToAdd(null);
        }

    }, [pendingNodeToAdd, screenToFlowPosition, setNodes, setPendingNodeToAdd]);
    //-------------------------------------------------------
    const dotColor = "var(--engine-grid-dots)";
    const edgeColor = "var(--engine-edge)";

    return (
        <div className={style.flow}>
            <ReactFlow
                //======================
                //      DATA
                //======================
                ref={ref}
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                selectionMode={'partial'}
                selectionKeyCode={'Shift'}
                //======================
                //     APPEARANCE
                //======================
                colorMode={theme}
                fitView
                snapGrid={[20, 20]}
                snapToGrid={true}
                defaultEdgeOptions={{
                    type: "wire",
                    animated: true,
                    style: {
                        strokeWidth: 2,
                        stroke: edgeColor //theme color
                    }
                }}
                connectionLineType={ConnectionLineType.Step}
                //======================
                //    EVENT HANDLERS
                //======================
                onDragOver={evtOnDragOver}
                onDrop={evtOnDrop}
                onNodeClick={evtOnNodeClicked}
                onPaneClick={evtOnPaneClick}
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={24}
                    size={2}
                    color={dotColor}
                />
                {
                //======================
                // CONTROLS (e.g. zoom in/out)
                //======================
                }
                <Controls
                    position={"bottom-right"}
                    showFitView={false}
                    className={style.customControls}
                />
            </ReactFlow>

            <NodeInspector
                node={selectedNode}
                setSelectedNode={setSelectedNode}
                theme={theme}
            />
        </div>
    );
}
//======================================================================================
interface GameWrapperProps {
    theme?: ThemeType;
}

export default function GameWrapper({ theme = "dark" }: GameWrapperProps) {
    const [pendingNodeToAdd, setPendingNodeToAdd] = useState<NodeData | null>(null);

    return (
        <div className={`${style.gameWrapper} engine-theme-${theme}`}>
            <SidebarPicker pendingNodeToAdd={pendingNodeToAdd} setPendingNodeToAdd={setPendingNodeToAdd} theme={theme} />
            <ReactFlowProvider>
                <Engine pendingNodeToAdd={pendingNodeToAdd} setPendingNodeToAdd={setPendingNodeToAdd} theme={theme} />
            </ReactFlowProvider>
        </div>
    )
}