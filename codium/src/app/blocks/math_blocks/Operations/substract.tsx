import { MathBlock } from "@/app/blocks/BaseBlock";
import React from "react";
import { NodeProps } from "@xyflow/react";

export const subtractBlock: MathBlock<[number, number]> = {
    id: "subtract",
    name: "Odejmowanie",
    category: "math",

    execute: ([a, b]) => {
        const result = a - b;

        if (!Number.isFinite(result)) {
            return {
                success: false,
                error: "Overflow: Wynik przekracza bezpieczny zakres liczb."
            };
        }

        return { success: true, value: result }; // ← "result" → "value"
    },

    visuals: {
        inputs: [
            { id: "a", label: "Liczba A" },
            { id: "b", label: "Liczba B" },
        ],
        outputs: [
            { id: "result", label: "Wynik" },
        ],
        component: (props: NodeProps) => (
            <div>A − B</div>
),
},
};