'use client';

import { Handle, Position } from '@xyflow/react';
import Image from "next/image";

export default function TestNode({data}) {
    const inputCount = 2;
    const spacing = 100 / (inputCount + 1);



    return (
        <div
            style={{
                padding: 10,
                background: 'white',
                border: '2px solid #222',
                borderRadius: 8,
            }}
        >

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

            <div style={{ textAlign: 'center', fontSize: 12 }}>
                {data.label}
            </div>

            <Handle id={"source"} type="source" position={Position.Right} />
        </div>
    );
}