import React from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Card, Box, Typography } from '@mui/material';

export type ForLoopData = {
  startIndex?: number;
  endIndex?: number;
  label?: string;
};

export default function ForLoopNode({ data }: NodeProps<Node<ForLoopData>>) {
  return (
    <Card 
      sx={{ 
        minWidth: 200, 
        overflow: 'visible', 
        borderRadius: '30px',
        border: '2px solid var(--yellowdark)',
        bgcolor: 'var(--white)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}
    >
      {/* NAGŁÓWEK */}
      <Box 
        sx={{ 
          bgcolor: 'var(--yellow)', 
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
            color: 'var(--graydark)'
          }}
        >
          FOR
        </Typography>
      </Box>
      
      {/* BODY */}
      <Box sx={{ position: 'relative', height: 120, my: 1 }}>
        
        {/* IN */}
        <Handle type="target" position={Position.Left} id="execute" style={{ top: '20%', background: 'var(--gray)', border: 'none' }} />
        <Typography sx={{ position: 'absolute', left: 16, top: '10%', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem', fontWeight: 500, color: 'var(--graydark)' }}>EXEC</Typography>

        <Handle type="target" position={Position.Left} id="startIndex" style={{ top: '50%', background: 'var(--yellowdark)', border: 'none' }} />
        <Typography sx={{ position: 'absolute', left: 16, top: '40%', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem', fontWeight: 500, color: 'var(--graydark)' }}>START</Typography>

        <Handle type="target" position={Position.Left} id="endIndex" style={{ top: '80%', background: 'var(--yellowdark)', border: 'none' }} />
        <Typography sx={{ position: 'absolute', left: 16, top: '70%', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem', fontWeight: 500, color: 'var(--graydark)' }}>END</Typography>

        {/* OUT */}
        <Handle type="source" position={Position.Right} id="loopBody" style={{ top: '20%', background: 'var(--gray)', border: 'none' }} />
        <Typography sx={{ position: 'absolute', right: 16, top: '10%', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem', fontWeight: 500, color: 'var(--graydark)' }}>LOOP</Typography>

        <Handle type="source" position={Position.Right} id="currentIndex" style={{ top: '50%', background: 'var(--yellowdark)', border: 'none' }} />
        <Typography sx={{ position: 'absolute', right: 16, top: '40%', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem', fontWeight: 500, color: 'var(--graydark)' }}>i</Typography>

        <Handle type="source" position={Position.Right} id="completed" style={{ top: '80%', background: 'var(--gray)', border: 'none' }} />
        <Typography sx={{ position: 'absolute', right: 16, top: '70%', fontFamily: "'Fira Code', monospace", fontSize: '0.75rem', fontWeight: 500, color: 'var(--graydark)' }}>COMPLETED</Typography>
      </Box>
    </Card>
  );
}