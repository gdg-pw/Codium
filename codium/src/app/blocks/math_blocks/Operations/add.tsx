import React from "react";
import { NodeProps } from "@xyflow/react";
import { MathBlock } from "@/app/blocks/BaseBlock";

type AddInputs = { a: number; b: number };

const AddBlockUI: React.FC<NodeProps> = () => (
    <span className="text-lg font-bold text-blue-700">+</span>
);

export const addBlock: MathBlock<AddInputs> = {
    id: "add",
    name: "Addition",
    category: "math",
    execute: ({ a, b }) => {
        const result = a + b;
        if (!Number.isFinite(result)) {
            return { success: false, error: "Overflow: result exceeds safe number range." };
        }
        return { success: true, value: result };
    },
    visuals: {
        inputs: [
            { id: "a", label: "A" },
            { id: "b", label: "B" },
        ],
        outputs: [
            { id: "result", label: "Result" },
        ],
        component: AddBlockUI,
    },
};
