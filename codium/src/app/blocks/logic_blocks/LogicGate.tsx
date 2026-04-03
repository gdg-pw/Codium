import React from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Card, Box, Select, MenuItem, SelectChangeEvent, Typography } from '@mui/material';
import styles from './css/LogicGate.module.css';

interface GateData {
  label?: string;
  gateType?: string;
}

interface PortConfig {
  id: string;
  type: 'target' | 'source';
  position: Position;
  top: number;
}

const GATE_OPTIONS = ['AND', 'OR', 'NOT', 'XOR', 'XNOR', 'NOR', 'NAND'];

export default function LogicGate({ id, data }: { id: string, data: GateData }) {
  const { updateNodeData } = useReactFlow();
  const currentGate = data.gateType || 'AND';

  const ports: PortConfig[] = [
    { id: 'a', type: 'target', position: Position.Left, top: 45 },
    { id: 'b', type: 'target', position: Position.Left, top: 80 },
    { id: 'out', type: 'source', position: Position.Right, top: 65 },
  ];

  const renderPorts = (items: PortConfig[]) => {
    return items.map((port: PortConfig) => (
      <Handle 
        key={port.id}
        type={port.type} 
        position={port.position} 
        id={port.id} 
        className={styles.handle}
        style={{ top: `${port.top}%` }} 
      />
    ));
  };

  const handleDropdownChange = (e: SelectChangeEvent) => {
    updateNodeData(id, { gateType: e.target.value });
  };

  return (
    <Card className={styles.card}>
      <Box className={styles.header}>
        <Typography className={styles.title}>
          LOGIC GATE
        </Typography>
      </Box>

      {renderPorts(ports)}

      <Box className={`${styles.body}`}>
        <Select
          value={currentGate}
          onChange={handleDropdownChange}
          size="small"
          fullWidth
          variant="outlined"
          className={`${styles.select} nodrag`}
          sx={{ 
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '.MuiSvgIcon-root': { color: 'var(--blue)' }
          }}
        >
          {GATE_OPTIONS.map((gate) => (
            <MenuItem key={gate} value={gate} sx={{ fontWeight: 500 }}>
              {gate}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Card>
  );
}