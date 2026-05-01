"use client";

import { BaseEdge, getSmoothStepPath, EdgeProps, useEdges } from '@xyflow/react';
import { ThemeType } from '@/app/engine/Engine';

export type WireEdgeData = {
    theme?: ThemeType;
};

export default function WireEdge({
                                     id,
                                     source,
                                     target,
                                     sourceX,
                                     sourceY,
                                     targetX,
                                     targetY,
                                     sourcePosition,
                                     targetPosition,
                                     selected,
                                     data,
                                 }: EdgeProps<WireEdgeData>) {

    const edges = useEdges();
    const parallelEdges = edges.filter(
        (e) => e.source === source && e.target === target
    );
    //failed attempt at making the edges not overlap :(((
    const edgeIndex = parallelEdges.findIndex((e) => e.id === id);
    const horizontalOffset = edgeIndex * 15;
    const verticalOffset = edgeIndex * 8;

    const isForward = sourceX < targetX;
    const customCenterX = isForward ? sourceX + 30 + horizontalOffset : undefined;

    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY: sourceY + verticalOffset,
        sourcePosition,
        targetX,
        targetY: targetY + verticalOffset,
        targetPosition,
        borderRadius: 8,
        centerX: customCenterX,
    });
    //==========================================
    //visuals
    const strokeColor = selected ? 'var(--engine-edge-selected)' : 'var(--engine-edge)';

    return (
        <BaseEdge
            id={id}
            path={edgePath}
            style={{
                stroke: strokeColor,
                strokeWidth: selected ? 3 : 2,
                transition: 'stroke 0.2s ease, stroke-width 0.2s ease',
                pointerEvents: 'stroke'
            }}
        />
    );
}