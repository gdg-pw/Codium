import React from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Card, Box, Typography } from '@mui/material';
import styles from './css/ForLoopNode.module.css';

export type ForLoopData = {
  startIndex?: number;
  endIndex?: number;
  label?: string;
};

interface PortConfig {
  id: string;
  label: string;
  type: 'target' | 'source';
  position: Position;
  top: number;
  color: string;
}

export default function ForLoopNode({ data }: NodeProps<Node<ForLoopData>>) {
  const ports: PortConfig[] = [
    { id: 'execute', label: 'EXEC', type: 'target', position: Position.Left, top: 20, color: 'var(--gray)' },
    { id: 'startIndex', label: 'START', type: 'target', position: Position.Left, top: 50, color: 'var(--yellowdark)' },
    { id: 'endIndex', label: 'END', type: 'target', position: Position.Left, top: 80, color: 'var(--yellowdark)' },
    { id: 'loopBody', label: 'LOOP', type: 'source', position: Position.Right, top: 20, color: 'var(--gray)' },
    { id: 'currentIndex', label: 'i', type: 'source', position: Position.Right, top: 50, color: 'var(--yellowdark)' },
    { id: 'completed', label: 'COMPLETED', type: 'source', position: Position.Right, top: 80, color: 'var(--gray)' },
  ];

  const renderPorts = (items: PortConfig[]) => {
    return items.map((port: PortConfig, index: number) => (
      <React.Fragment key={index}>
        <Handle 
          type={port.type} 
          position={port.position} 
          id={port.id} 
          className={styles.handle}
          style={{ top: `${port.top}%`, backgroundColor: port.color }} 
        />
        <Typography 
          className={`${styles.label} ${port.position === Position.Left ? styles.labelLeft : styles.labelRight}`}
          style={{ top: `${port.top - 10}%` }}
        >
          {port.label}
        </Typography>
      </React.Fragment>
    ));
  };

  return (
    <Card className={styles.card}>
      <Box className={styles.header}>
        <Typography className={styles.title}>
          FOR
        </Typography>
      </Box>
      <Box className={styles.body}>
        {renderPorts(ports)}
      </Box>
    </Card>
  );
}