import React from 'react';
import { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import styles from '@app/engine/css/LogicGate.module.css';

interface GateData {
  label: string;
  gateType: string;
}

export default function LogicGate({ id, data }: { id: string, data: GateData }) {
  const { updateNodeData } = useReactFlow();
  const currentGate = data.gateType || 'AND';
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateNodeData(id, { gateType: e.target.value });
  };

  return (
    <div className={styles.gateBody}>
      <Handle 
        type="target" 
        position={Position.Left} 
        id="a" 
        className={styles.handle}
        style={{ top: '30%' }} 
      />
      
      <Handle 
        type="target" 
        position={Position.Left} 
        id="b" 
        className={styles.handle}
        style={{ top: '70%' }} 
      />

      <div className={styles.dropdown}>
        <select value={currentGate} onChange={handleDropdownChange}>
          <option value="AND">AND</option>
          <option value="OR">OR</option>
          <option value="NOT">NOT</option>
          <option value="XOR">XOR</option>
          <option value="XNOR">XNOR</option>
          <option value="NOR">NOR</option>
          <option value="NAND">NAND</option>
        </select>
      </div>

      <Handle 
        type="source" 
        position={Position.Right} 
        id="out" 
        className={styles.handle}
      />
    </div>
  );
}