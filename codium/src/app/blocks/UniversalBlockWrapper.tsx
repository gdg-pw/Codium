import React from "react";
import { NodeProps, Handle, Position } from "@xyflow/react";
import { blocksRegistry } from "@/app/blocks/BlocksRegistry";

const UniversalBlockWrapper: React.FC<NodeProps> = (props) => {
    const block = blocksRegistry[props.type];

    if (!block) {
        return (
            <div className="p-2 bg-red-100 border border-red-500 rounded text-red-700 text-xs">
                Unknown block: {props.type}
            </div>
        );
    }

    const { inputs, outputs, component: InnerComponent } = block.visuals;

    return (
        <div className="min-w-[160px] rounded-lg overflow-hidden shadow-md border border-gray-300 bg-white">

            {/* Header */}
            <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 text-center">
                {block.name}
            </div>

            {/* Body */}
            <div className="flex items-stretch">

                {/* Input ports */}
                <div className="flex flex-col justify-around py-2 pl-0 pr-2 gap-1">
                    {inputs.map((input) => (
                        <div key={input.id} className="relative flex items-center h-6">
                            <Handle
                                type="target"
                                position={Position.Left}
                                id={input.id}
                                className="w-3 h-3 border-2 border-gray-600 bg-blue-300"
                            />
                            <span className="text-[10px] text-gray-500 pl-3">
                                {input.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Inner component */}
                <div className="flex-1 flex items-center justify-center px-1 py-2">
                    <InnerComponent {...props} />
                </div>

                {/* Output ports */}
                <div className="flex flex-col justify-around py-2 pl-2 pr-0 gap-1">
                    {outputs.map((output) => (
                        <div key={output.id} className="relative flex items-center justify-end h-6">
                            <span className="text-[10px] text-gray-500 pr-3">
                                {output.label}
                            </span>
                            <Handle
                                type="source"
                                position={Position.Right}
                                id={output.id}
                                className="w-3 h-3 border-2 border-gray-600 bg-green-300"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default UniversalBlockWrapper;
export { UniversalBlockWrapper as UniversalBlockNode };
