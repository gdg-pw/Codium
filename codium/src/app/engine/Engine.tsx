"use client";
//======================================================================================
import React, { useState, useCallback, useRef } from 'react';
import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    useReactFlow,
    ReactFlowProvider,
    ConnectionLineType,
    Controls,
    SelectionMode,
    OnNodesChange,
    OnEdgesChange,
    Edge,
    XYPosition,
    Node,
    Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Background, BackgroundVariant } from '@xyflow/react';
//-------------------------------------------------------
import ExampleNode from '@/app/engine/components/node/items/ExampleNode';
import AnimatedEdge from "@/app/engine/components/AnimatedEdge";
import SidebarPicker from "@/app/engine/SidebarPicker";
import NodeInspector from "@/app/engine/components/node/NodeInspector";
//-------------------------------------------------------
import style from "@/app/engine/css/Engine.module.css"
import { initialEdges, initialNodes } from "@/app/engine/TestLevel";
import { UniversalBlockNode } from "@/app/blocks/UniversalBlockWrapper";
import { blocksRegistry } from "@/app/blocks/BlocksRegistry";
//======================================================================================
export type NodeData = {
    label: string;
    iconFile: string;
    type: string;
}

interface EngineProps {
    pendingNodeToAdd: NodeData | null;
    setPendingNodeToAdd: (node: NodeData | null) => void;
}

const edgeTypes = {
    wire: AnimatedEdge,
};

const registryNodeTypes = Object.fromEntries(
    Object.keys(blocksRegistry).map((id) => [id, UniversalBlockNode])
);

const nodeTypes = {
    test1:     ExampleNode,
    gate1:     ExampleNode,
    gate2:     ExampleNode,
    math1:     ExampleNode,
    math2:     ExampleNode,
    whatever1: ExampleNode,
    ...registryNodeTypes,
};
//======================================================================================
function Engine({ pendingNodeToAdd, setPendingNodeToAdd }: EngineProps) {
    const [nodes, setNodes] = useState<Node<NodeData>[]>(initialNodes as Node<NodeData>[]);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const { screenToFlowPosition } = useReactFlow();
    const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
    const ref = useRef(null);
    //-------------------------------------------------------
    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds) as Node<NodeData>[]),
        [],
    );

    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [],
    );
    //-------------------------------------------------------
    function makeFromNodeData(parsedData: NodeData, translatedPosition: XYPosition): Node<NodeData> {
        return {
            id: `${parsedData.type}_node_${Date.now()}`,
            type: parsedData.type,
            position: translatedPosition,
            data: {
                label:    parsedData.label,
                iconFile: parsedData.iconFile,
                type:     parsedData.type,
            },
        };
    }

    const evtOnDrop = useCallback(
        (evt: React.DragEvent) => {
            evt.preventDefault();

            const dragDataString = evt.dataTransfer.getData("application/reactflow");
            let parsedData;
            try {
                parsedData = JSON.parse(dragDataString);
            } catch {
                return;  // removed unused `e`
            }

            const translatedPosition = screenToFlowPosition({
                x: evt.clientX,
                y: evt.clientY,
            });

            setNodes((nds) => [...nds, makeFromNodeData(parsedData, translatedPosition)]);
        },
        [screenToFlowPosition],
    );

    const evtOnDragOver = (evt: React.DragEvent) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "move";
    };

    const evtOnNodeClicked = (evt: React.MouseEvent, clickedNode: Node<NodeData>) => {
        evt.preventDefault();

        setNodes((nds) =>
            nds.map((node) => ({
                ...node,
                //TODO: this is temporary CHANGE ME LATER (I dont wanna be just a red ugly border pls🥺🥺🥺)!!!
                style: {
                    ...node.style,
                    border: node.id === clickedNode.id ? "5px solid red" : "",
                },
            }))
        );

        setSelectedNode(clickedNode);
    };

    const evtOnPaneClick = useCallback((evt: React.MouseEvent) => {
        evt.preventDefault();
        setSelectedNode(null);

        if (pendingNodeToAdd) {
            const translatedPosition = screenToFlowPosition({
                x: evt.clientX,
                y: evt.clientY,
            });

            setNodes((nds) => [...nds, makeFromNodeData(pendingNodeToAdd, translatedPosition)]);
            setPendingNodeToAdd(null);
        }

    }, [pendingNodeToAdd, screenToFlowPosition, setNodes, setPendingNodeToAdd]);
    //-------------------------------------------------------
    return (
        <div className={style.flow} style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                ref={ref}
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                selectionMode={SelectionMode.Partial}
                selectionKeyCode={'Shift'}
                fitView
                snapGrid={[20, 20]}
                snapToGrid={true}
                defaultEdgeOptions={{
                    type: "wire",
                    animated: true,
                    style: { strokeWidth: 2 }
                }}
                connectionLineType={ConnectionLineType.Step}
                onDragOver={evtOnDragOver}
                onDrop={evtOnDrop}
                onNodeClick={evtOnNodeClicked}
                onPaneClick={evtOnPaneClick}
            >
                <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
                <Controls position={"bottom-right"} showFitView={false} />
            </ReactFlow>
            <NodeInspector
                node={selectedNode as Node<NodeData>}
                setSelectedNode={setSelectedNode}
            />
        </div>
    );
}

export default function GameWrapper() {
    const [pendingNodeToAdd, setPendingNodeToAdd] = useState<NodeData | null>(null);

    return (
        <div className={style.gameWrapper}>
            <SidebarPicker pendingNodeToAdd={pendingNodeToAdd} setPendingNodeToAdd={setPendingNodeToAdd} />
            <ReactFlowProvider>
                <Engine pendingNodeToAdd={pendingNodeToAdd} setPendingNodeToAdd={setPendingNodeToAdd} />
            </ReactFlowProvider>
        </div>
    );
}
