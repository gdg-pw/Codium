import * as React from "react";
import { NodeProps } from "@xyflow/react";
import { MathBlock } from "../../BaseBlock";

type SubtractionInputs = { a: number; b: number };

const SubtractionBlockUI: React.FC<NodeProps> = () => (
    <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "6px 10px", gap: 4,
    }}>
        <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "#dc2626",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, fontWeight: 900, color: "#fff",
            boxShadow: "0 0 16px #dc262666, 0 2px 6px #dc262644",
            fontFamily: "monospace", userSelect: "none",
        }}>
            −
        </div>
        <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#dc2626", opacity: 0.8,
        }}>
            Subtraction
        </span>
    </div>
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
