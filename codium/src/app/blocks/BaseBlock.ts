import { BlockResult } from "@/app/blocks/BlockResult";
import {NodeProps} from "@xyflow/react";

//allowed data types
export type AllowedInputValues = number[] | boolean[];


//===============================
//      PORT INPUT/OUTPUT
//===============================
export interface PortDefinition {
    id: string;     // np. "a", "b", "values"
    label: string;  // np. "Liczba A"
}

//===============================
//        BASE BLOCK
//===============================
export interface BaseBlock<TCategory extends string, TInputs extends AllowedInputValues, TOutput> {
    id: string;
    name: string;
    category: TCategory;
    execute: (inputs: TInputs) => BlockResult<TOutput>;

    // --- NOWA SEKCJA WIZUALNA ---
    visuals: {
        inputs: PortDefinition[];  // Porty wejściowe (z lewej)
        outputs: PortDefinition[]; // Porty wyjściowe (z prawej)
        // TSX stanowiący środek bloku. NodeProps daje dostęp do np. data, id
        component: React.FC<NodeProps>;
    };
}

//===============================
//        SPECIFIC BLOCKS
//===============================
//tinput is a record with <key, number> or just an array of numbers wrapped in that record
export type MathBlock<TInputs extends number[]> = BaseBlock<"math", TInputs, number>;

//tinput is a record with <key, number> or just an array of booleans wrapped in that record
export type LogicBlock<TInputs extends boolean[]> = BaseBlock<"logic", TInputs, boolean>;

//===============================
//       ANY GAME BLOCK
//===============================
export type AnyGameBlock =
    | MathBlock<any>
    | LogicBlock<any>;