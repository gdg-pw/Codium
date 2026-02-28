"use client";
//======================================================================================
import {useState, useCallback, useRef} from 'react';
import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Edge,
    useReactFlow,
    ReactFlowProvider, ConnectionLineType, Controls
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Background, BackgroundVariant } from '@xyflow/react';

import ExampleNode from './ExampleNode';
import AnimatedEdge from "@/app/engine/AnimatedEdge";
import style from "./css/Engine.module.css"
import SidebarPicker from "@/app/engine/SidebarPicker";
//======================================================================================
const edgeTypes = {
    wire: AnimatedEdge,
};

const nodeTypes = {
    test1: ExampleNode,
};
//======================================================================================
const initialNodes: Node[] = [
    {
        id: 'test1',
        type: 'test1',
        position: { x: 100, y: 100 },
        data: { //TODO: remove temp constant
            label: 'Test_1',
            iconFile: "/dog.svg"
        },
    },
    {
        id: 'test2',
        type: 'test1',
        position: { x: 300, y: 100 },
        data: { //TODO: remove temp constant
            label: 'Test_2',
            iconFile: "/cat.svg"
        },
    },
];
//======================================================================================
const initialEdges: Edge[] = [
    {
        id: '1-2',
        source: 'test1',
        target: 'test2',
        sourceHandle: 'source',
        targetHandle: 'left-1',
        type: 'wire',
        animated: true
    },
];
//======================================================================================
//======================================================================================
function Engine() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const { screenToFlowPosition } = useReactFlow();
    const [menu, setMenu] = useState(null);
    const ref = useRef(null);
    //-------------------------------------------------------
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params: never) => setEdges((eds) => addEdge(params, eds)),
        [],
    );
    //-------------------------------------------------------
    //when dragged, drop the node where mouse cursor is
    const evtOnDrop=useCallback(
        (evt) => {
            evt.preventDefault();

            const nodeType = evt.dataTransfer.getData("application/reactflow");
            const translatedPosition = screenToFlowPosition({
                x: evt.clientX,
                y: evt.clientY,
            });

            const node: Node = {
                id: `test_node_${Date.now()}`,
                type: nodeType,
                position: translatedPosition,
                data: {
                    label: nodeType,
                    iconFile: "/dog.svg" //TODO: remove temp constant
                }
            };

            setNodes((nds) => [...nds, node]) //add the node
        },
        [screenToFlowPosition],
    );

    const evtOnDragOver= (evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "move";
    };


    const evtOnNodeContextMenu = (evt, node) => {
        evt.preventDefault();
        //TODO
        console.log("Not implemented!");
    };
    //-------------------------------------------------------
    //-------------------------------------------------------
    return (
        <div className={style.flow} style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                //======================
                //      DATA
                //======================
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
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
                onNodeContextMenu={evtOnNodeContextMenu}
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
        </div>
    );
}

export default () => (
    <div className={style.gameWrapper}>
        <SidebarPicker />
        <ReactFlowProvider>
            <Engine />
        </ReactFlowProvider>
    </div>
);