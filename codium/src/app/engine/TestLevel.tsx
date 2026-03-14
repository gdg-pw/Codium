//======================================================================================
// Not really a level, but a collection of node that the engine starts with
// right now its only purpose is to clean up the Engine.tsx file
// i guess later it can become a level or smth idk
// todo
//======================================================================================
//======================================================================================
import {Edge, Node} from "@xyflow/react";

export const initialNodes: Node[] = [
    {
        id: 'test1',
        type: 'test1',
        position: { x: 100, y: 100 },
        data: {
            label: 'Test_1',
            iconFile: "/dog.svg"
        },
    },
    {
        id: 'test2',
        type: 'test1',
        position: { x: 300, y: 100 },
        data: {
            label: 'Test_2',
            iconFile: "/cat.svg"
        },
    },
];
//======================================================================================
export const initialEdges: Edge[] = [
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


