import React from 'react';
import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import styles from './css/LogicGate.module.css';

interface GateData {
  label: string;
}

export default function LogicGate({ data }: { data: GateData }) {
  const [valueId, setValueId] = useState('AND');

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
        <select value={valueId} onChange={e => setValueId(e.target.value)}>
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