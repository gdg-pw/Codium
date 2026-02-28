'use client';

import {
    BaseEdge,
    EdgeLabelRenderer, getBezierPath, getSmoothStepPath,
    getStraightPath,
} from '@xyflow/react';

export default function AnimatedEdge({
                                     id,
                                     sourceX,
                                     sourceY,
                                     targetX,
                                     targetY,
                                     selected,
                                 }) {
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