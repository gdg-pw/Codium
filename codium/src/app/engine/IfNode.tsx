import React from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import styles from '@/app/engine/css/LogicGate.module.css';

export type IfNodeData = {
    label: string;
};

export default function IfNode({ data }: NodeProps<Node<IfNodeData>>) {
    return (
        <div className={styles.gateBody} style={{ minWidth: '150px', minHeight: '90px', padding: 0, border: '2px solid #555' }}>

            <div style={{ background: '#222', color: 'white', padding: '5px', textAlign: 'center', fontSize: '12px', borderBottom: '1px solid #555' }}>
                IF
            </div>

            {/*Input :: Execution Flow*/}
            <Handle type="target" position={Position.Left} id="execute" style={{ top: '45%' }} />
            <div style={{ position: 'absolute', left: 10, top: '40%', fontSize: '10px' }}>EXEC</div>

            {/* Input :: Boolean Condition */}
            <Handle type="target" position={Position.Left} id="condition" style={{ top: '80%' }} />
            <div style={{ position: 'absolute', left: 10, top: '75%', fontSize: '10px' }}>COND</div>

            {/*Output :: True*/}
            <Handle type="source" position={Position.Right} id="true" style={{ top: '45%' }} />
            <div style={{ position: 'absolute', right: 10, top: '40%', fontSize: '10px' }}>TRUE</div>

            {/*Output :: False*/}
            <Handle type="source" position={Position.Right} id="false" style={{ top: '80%' }} />
            <div style={{ position: 'absolute', right: 10, top: '75%', fontSize: '10px' }}>FALSE</div>
        </div>
    );
}