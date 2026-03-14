import React from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import styles from '@/app/engine/css/LogicGate.module.css'; // TODO: placeholder

export type ForLoopData = {
  startIndex: number;
  endIndex: number;
  label: string;
};

export default function ForLoopNode({ data }: NodeProps<Node<ForLoopData>>) {
  return (
    <div className={styles.gateBody} style={{ minWidth: '150px', border: '2px solid #555' }}>
        <div style={{ background: '#333', color: 'white', padding: '5px', textAlign: 'center', fontSize: '12px', borderBottom: '1px solid #555' }}>
            FOR
        </div>

        {/* INPUT */}
        <Handle type="target" position={Position.Left} id="execute" style={{ top: '30%' }} />
        <div style={{ position: 'absolute', left: 15, top: '26%', fontSize: '10px' }}></div>
        <Handle type="target" position={Position.Left} id="startIndex" style={{ top: '60%' }} />
        <div style={{ position: 'absolute', left: 15, top: '56%', fontSize: '10px' }}>START</div>
        <Handle type="target" position={Position.Left} id="endIndex" style={{ top: '90%' }} />
        <div style={{ position: 'absolute', left: 15, top: '86%', fontSize: '10px' }}>END</div>

        {/* OUTPUT */}
        <Handle type="source" position={Position.Right} id="loopBody" style={{ top: '30%' }} />
        <div style={{ position: 'absolute', right: 15, top: '26%', fontSize: '10px' }}>LOOP BODY</div>
        <Handle type="source" position={Position.Right} id="currentIndex" style={{ top: '60%' }} />
        <div style={{ position: 'absolute', right: 15, top: '56%', fontSize: '10px' }}>i</div>
        <Handle type="source" position={Position.Right} id="completed" style={{ top: '90%' }} />
        <div style={{ position: 'absolute', right: 15, top: '86%', fontSize: '10px' }}>COMPLETED</div>
    </div>
  );
}