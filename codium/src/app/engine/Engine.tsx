"use client";
//======================================================================================
import React, {useState, useCallback, useRef} from 'react';
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
import AnimatedEdge from "@/app/engine/components/AnimatedEdge";
import SidebarPicker from "@/app/engine/SidebarPicker";
import NodeInspector from "@/app/engine/components/node/NodeInspector";
//-------------------------------------------------------
import style from "@/app/engine/css/Engine.module.css"
import {initialEdges, initialNodes} from "@/app/engine/TestLevel";
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

const nodeTypes = {
    test1: ExampleNode,
    gate1: ExampleNode,
    gate2: ExampleNode,
    math1: ExampleNode,
    math2: ExampleNode,
    whatever1: ExampleNode,
};
//======================================================================================
function Engine({ pendingNodeToAdd, setPendingNodeToAdd }: EngineProps) {
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
    const evtOnDrop= useCallback(
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

    const evtOnDragOver= (evt: React.DragEvent) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "move";
    };


    const evtOnNodeClicked = (evt: React.MouseEvent, clickedNode: Node) => {
        evt.preventDefault();

        //mark the clicked node as selected - only visually :(
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
        setSelectedNode(null)

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
    //-------------------------------------------------------
    return (
        <div className={style.flow} style={{ width: '100vw', height: '100vh' }}>
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
                fitView
                snapGrid={[20,20]}
                snapToGrid={true}
                defaultEdgeOptions={{
                    type: "wire",
                    animated: true,
                    style: {
                        strokeWidth: 2
                    }
                }}
                connectionLineType={ConnectionLineType.Step}
                //======================
                //    EVENT HANDLERS
                //======================
                onDragOver={evtOnDragOver}
                onDrop={evtOnDrop}
                // onNodeContextMenu={evtOnNodeClicked}
                onNodeClick={evtOnNodeClicked}
                onPaneClick={evtOnPaneClick}
                //======================
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={20}
                    size={1}
                />
            {
            //======================
            // CONTROLS (e.g. zoom in/out)
            //======================
            }
            <Controls
                position={"bottom-right"}
                showFitView={false}

            />
            </ReactFlow>
            <NodeInspector
                node={selectedNode}
                setSelectedNode={setSelectedNode}
            />
        </div>
    );
}

export default function GameWrapper() {
    const [pendingNodeToAdd, setPendingNodeToAdd] = useState(null);

    return (
        <div className={style.gameWrapper}>
            <SidebarPicker pendingNodeToAdd={pendingNodeToAdd} setPendingNodeToAdd={setPendingNodeToAdd} />
            <ReactFlowProvider>
                <Engine pendingNodeToAdd={pendingNodeToAdd} setPendingNodeToAdd={setPendingNodeToAdd}/>
            </ReactFlowProvider>
        </div>
    )
}