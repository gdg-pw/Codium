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
        overflow: 'visible', // Żeby nie ucinało kropek
        borderRadius: '30px', // Z Design Systemu
        border: '2px solid var(--blue)', 
        bgcolor: 'var(--white)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}
    >
      {/* NAGŁÓWEK */}
      <Box 
        sx={{ 
          bgcolor: 'var(--blue)', 
          py: 1, 
          textAlign: 'center', 
          cursor: 'grab',
          // Odejmujemy grubość ramki od zaokrąglenia, żeby tło nie wystawało
          borderTopLeftRadius: '28px', 
          borderTopRightRadius: '28px' 
        }}
      >
        <Typography 
          sx={{ 
            fontFamily: "'Fira Code', monospace", 
            fontSize: '0.875rem', // Z DS: Footer
            fontWeight: 700,      // Z DS: Bold
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
            fontSize: '1rem', // Z DS: Body
            fontWeight: 500,  // Z DS: Medium
            color: 'var(--bluedark)',
            bgcolor: 'var(--whiteblue)', // Lekkie tło dla inputa
            borderRadius: '30px',        // Zaokrąglenie wewnątrz
            '.MuiOutlinedInput-notchedOutline': { border: 'none' }, // Płaski design
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