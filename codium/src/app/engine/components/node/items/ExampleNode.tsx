'use client';

import { Handle, Position } from '@xyflow/react';
import Image from "next/image";
import {NodeData} from "@/app/engine/Engine";
//======================================================================================
interface NodeProps {
    data: NodeData;
}
//======================================================================================
export default function ExampleNode({data}: NodeProps) {
    const inputCount = 2;
    const spacing = 100 / (inputCount + 1);

    const style = {
                padding: 10,
                background: 'var(--engine-bg-secondary)',
                border: '1px solid var(--engine-border)',
                borderRadius: 'var(--engine-radius)',
                color: 'var(--engine-text-main)',
    };


    return (
        <div style={style}>

            {
                //Create {inputCount} input handles with {spacing}
                Array.from({ length: inputCount }).map((_, i) => (
                    <Handle
                        key={i}
                        type="target"
                        position={Position.Left}
                        id={`left-${i}`}
                        style={{ top: `${(i + 1) * spacing}%` }}
                    />
                ))
            }

            <Image src={data.iconFile} alt="Node icon" width={100} height={100} />

            <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--engine-text-main)' }}>
                {data.label}
            </div>

            <Handle id={"source"} type="source" position={Position.Right} />
        </div>
    );
}