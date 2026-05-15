import { BlockResult } from "@/app/blocks/BlockResult";
import { NodeProps } from "@xyflow/react";

// Allowed data types for inputs — keyed by port ID
export type AllowedInputValues = Record<string, number | boolean>;

//===============================
//      PORT INPUT/OUTPUT
//===============================
export interface PortDefinition {
    id: string;
    label: string;
}

//===============================
//        BASE BLOCK
//===============================
export interface BaseBlock<TCategory extends string, TInputs extends AllowedInputValues, TOutput> {
    id: string;
    name: string;
    category: TCategory;

    // `data` carries node-level state (e.g. selected gate type, dropdown config)
    execute: (inputs: TInputs, data?: Record<string, unknown>) => BlockResult<TOutput>;

    visuals: {
        inputs: PortDefinition[];
        outputs: PortDefinition[];
        // Inner component rendered inside UniversalBlockWrapper (no Card/header/handles)
        component: React.FC<NodeProps>;
    };
}

//===============================
//        SPECIFIC BLOCKS
//===============================
export type MathBlock<TInputs extends Record<string, number>> =
    BaseBlock<"math", TInputs, number>;

export type LogicBlock<TInputs extends Record<string, boolean>> =
    BaseBlock<"logic", TInputs, boolean>;

// FlowBlock output is flexible — e.g. a loop produces number[]
export type FlowBlock<TInputs extends AllowedInputValues, TOutput = void> =
    BaseBlock<"flow", TInputs, TOutput>;

//===============================
//       ANY GAME BLOCK
//===============================
export type AnyGameBlock =
    | MathBlock<any>
    | LogicBlock<any>
    | FlowBlock<any, any>;
