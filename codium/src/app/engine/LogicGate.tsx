import React from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Card, Box, Select, MenuItem, SelectChangeEvent, Typography } from '@mui/material';

interface GateData {
  label?: string;
  gateType?: string;
}

const GATE_OPTIONS = ['AND', 'OR', 'NOT', 'XOR', 'XNOR', 'NOR', 'NAND'];

export default function LogicGate({ id, data }: { id: string, data: GateData }) {
  const { updateNodeData } = useReactFlow();
  const currentGate = data.gateType || 'AND';

  const handleDropdownChange = (e: SelectChangeEvent) => {
    updateNodeData(id, { gateType: e.target.value });
  };

  return (
    <Card 
      sx={{ 
        minWidth: 160, 
        overflow: 'visible',
        borderRadius: '30px',
        border: '2px solid var(--blue)', 
        bgcolor: 'var(--white)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}
    >
      {/* HEADER */}
      <Box 
        sx={{ 
          bgcolor: 'var(--blue)', 
          py: 1, 
          textAlign: 'center', 
          cursor: 'grab',
          borderTopLeftRadius: '28px', 
          borderTopRightRadius: '28px' 
        }}
      >
        <Typography 
          sx={{ 
            fontFamily: "'Fira Code', monospace", 
            fontSize: '0.875rem',
            fontWeight: 700,
            color: 'var(--white)' 
          }}
        >
          LOGIC GATE
        </Typography>
      </Box>

      {/* IN */}
      <Handle type="target" position={Position.Left} id="a" style={{ top: '45%', background: 'var(--bluedark)', border: 'none' }} />
      <Handle type="target" position={Position.Left} id="b" style={{ top: '80%', background: 'var(--bluedark)', border: 'none' }} />

      {/* BODY */}
      <Box sx={{ p: 2, position: 'relative' }}>
        <Select
          className="nodrag"
          value={currentGate}
          onChange={handleDropdownChange}
          size="small"
          fullWidth
          variant="outlined"
          sx={{ 
            fontFamily: "'Fira Code', monospace",
            fontSize: '1rem',
            fontWeight: 500,
            color: 'var(--bluedark)',
            bgcolor: 'var(--whiteblue)',
            borderRadius: '30px',
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '.MuiSvgIcon-root': { color: 'var(--blue)' }
          }}
        >
          {GATE_OPTIONS.map((gate) => (
            <MenuItem 
              key={gate} 
              value={gate}
              sx={{ fontFamily: "'Fira Code', monospace", fontWeight: 500 }}
            >
              {gate}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* OUT */}
      <Handle type="source" position={Position.Right} id="out" style={{ top: '65%', background: 'var(--bluedark)', border: 'none' }} />
    </Card>
  );
}