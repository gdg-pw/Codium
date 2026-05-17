import * as React from "react";
import { NodeProps } from "@xyflow/react";
import { MathBlock } from "../../BaseBlock";

type AdditionInputs = { a: number; b: number };

const AdditionBlockUI: React.FC<NodeProps> = () => (
    <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "6px 10px", gap: 4,
    }}>
        <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "#2563eb",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, fontWeight: 900, color: "#fff",
            boxShadow: "0 0 16px #2563eb66, 0 2px 6px #2563eb44",
            fontFamily: "monospace", userSelect: "none",
        }}>
            +
        </div>
        <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#2563eb", opacity: 0.8,
        }}>
            Addition
        </span>
    </div>
);

export const addBlock: MathBlock<AdditionInputs> = {
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
        inputs:  [{ id: "a", label: "A" }, { id: "b", label: "B" }],
        outputs: [{ id: "result", label: "Result" }],
        component: AdditionBlockUI,
    },
};
