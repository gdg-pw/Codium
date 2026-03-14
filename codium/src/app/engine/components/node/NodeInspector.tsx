import React from 'react';
import {Node, useReactFlow} from '@xyflow/react';
//-------------------------------------------------------
import {NodeData} from "@/app/engine/Engine";
import styles from "@/app/engine/css/NodeInspector.module.css"
//======================================================================================
interface NodeInspectorProps {
    node: Node<NodeData>;
    setSelectedNode: React.Dispatch<React.SetStateAction<Node<NodeData> | null>>;
}
//======================================================================================
export default function NodeInspector({ node, setSelectedNode }: NodeInspectorProps) {
    const { setNodes, setEdges} = useReactFlow();

    if (!node)
        return null;
    // =================================================================
    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLabel = e.target.value;

        setNodes((nds) =>
            nds.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, label: newLabel } } : n))
        );

        setSelectedNode((prevNode) => {
            if (!prevNode)
                return null;

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
    //                  BUTTON FUNCTIONS
    // =================================================================
    function evtButtonDelete() {
        // delete the node
        setNodes((nds) => nds.filter((n) => n.id !== node.id));

        // delete edges in/out of the node
        setEdges((eds) => eds.filter((edge) => edge.source !== node.id && edge.target !== node.id));

        setSelectedNode(null);
    }
    // =================================================================
    function evtButtonCopy() {

    }
    // =================================================================
    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4>Edit Node</h4>
                <button style={{ cursor: 'pointer' }}>X</button>
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
                <input
                    type="text"
                    value={node.data.label || ''}
                    onChange={handleLabelChange}
                    style={{ padding: '5px', width: '100%' }}
                />
            </div>

            {
                // TODO: delete this and make an actually good UI
            }
            <button onClick={evtButtonDelete}>Delete</button>
            <button onClick={evtButtonCopy}>Copy</button>
            <h2>====================</h2>
            <button>Some</button>
            <button>Other</button>
            <button>Buttons</button>
            <button>That</button>
            <button>Dont</button>
            <button>Work</button>
            <button>For</button>
            <button>Now</button>


            <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                ID: {node.id}
            </div>
        </div>
    );
}