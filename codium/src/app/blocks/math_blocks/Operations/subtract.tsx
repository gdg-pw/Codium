import * as React from "react";
import { NodeProps } from "@xyflow/react";
import { MathBlock } from "../../BaseBlock";

type SubtractionInputs = { a: number; b: number };

const SubtractionBlockUI: React.FC<NodeProps> = () => (
    <span style={{ fontSize: 20, fontWeight: 700, color: "#1d4ed8" }}>−</span>
);

export const subtractBlock: MathBlock<SubtractionInputs> = {
    id: "subtract",
    name: "Subtraction",
    category: "math",
    execute: ({ a, b }) => {
        const result = a - b;
        if (!Number.isFinite(result)) {
            return { success: false, error: "Overflow: result exceeds safe number range." };
        }
        return { success: true, value: result };
    },
    visuals: {
        inputs:  [{ id: "a", label: "A" }, { id: "b", label: "B" }],
        outputs: [{ id: "result", label: "Result" }],
        component: SubtractionBlockUI,
    },
};
