// UniversalBlockNode.tsx
import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import {blocksRegistry} from "@/app/blocks/BlocksRegistry";

export const UniversalBlockNode: React.FC<NodeProps> = (props) => {
    // Zakładamy, że przy tworzeniu node'a w React Flow podajesz data: { blockId: "add" }
    const blockId = props.data?.blockId as string;
    const blockDef = blocksRegistry[blockId];

    if (!blockDef) {
        return (
            <div className="p-4 bg-red-100 border-2 border-red-500 rounded text-red-900 text-xs">
                Brak definicji: {blockId}
            </div>
        );
    }

    const { inputs, outputs, component: InnerComponent } = blockDef.visuals;

    let i = -1;

    return (
        <div className="bg-white border-2 border-gray-800 rounded-lg shadow-xl min-w-[160px] overflow-hidden">
            {/* Nagłówek bloku */}
            <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider text-center">
                {blockDef.name}
            </div>

            <div className="flex flex-col py-2 gap-1">
                {/* 1. WEJŚCIA (Lewa strona) */}
                {
                    inputs.map((input) => (
                    <div key={input.id} className="relative flex items-center px-2 h-6">
                        <Handle
                            type="target"
                            position={Position.Left}
                            id={input.id}
                            className="w-3 h-3 border-2 border-gray-800 bg-blue-300 left-[-7px]"
                            style={{ top: `${(++i) * 50}%` }}
                        />
                        <span className="text-[10px] text-gray-600 font-medium pl-2">
                            {input.label}
                        </span>
                    </div>
                ))}

                {/* 2. ŚRODEK (Customowy TSX z definicji) */}
                <div className="px-3 py-2 border-y border-gray-100 bg-gray-50 my-1">
                    <InnerComponent {...props} />
                </div>

                {/* 3. WYJŚCIA (Prawa strona) */}
                {outputs.map((output) => (
                    <div key={output.id} className="relative flex items-center justify-end px-2 h-6">
                        <span className="text-[10px] text-gray-600 font-medium pr-2">
                            {output.label}
                        </span>
                        <Handle
                            type="source"
                            position={Position.Right}
                            id={output.id}
                            className="w-3 h-3 border-2 border-gray-800 bg-green-400 right-[-7px]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};