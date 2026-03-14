'use client';

import { BaseEdge, getSmoothStepPath } from '@xyflow/react';

interface AnimatedEdgeProps {
    id: string;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    selected: boolean;
}

export default function AnimatedEdge({
                                     id,
                                     sourceX,
                                     sourceY,
                                     targetX,
                                     targetY,
                                     selected,
                                 }: AnimatedEdgeProps) {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                style={{
                    stroke: selected ? '#ff0072' : '#222',
                    strokeWidth: 2,
                }}
            />
        </>
    );
}