import {additionBlock} from "@/app/mathBlocks/Operations/add";
import {subtractionBlock} from "@/app/mathBlocks/Operations/substract";
import {multiplicationBlock} from "@/app/mathBlocks/Operations/multiplication";
import {divisionBlock} from "@/app/mathBlocks/Operations/division";
import {BlockResult} from "@/app/mathBlocks/BlockResult";

export type BlockType = "add" | "subtract" | "multiply" | "divide";

export function runBlock(type: BlockType, a: number, b: number): BlockResult {
    switch (type) {
        case "add":
            return additionBlock(a, b);
        case "subtract":
            return subtractionBlock(a, b);
        case "multiply":
            return multiplicationBlock(a, b);
        case "divide":
            return divisionBlock(a, b);
        default:
            return { success: false, error: `Unknown block type: ${type}` };
    }
}