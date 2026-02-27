import {BlockResult} from "@/app/mathBlocks/BlockResult";

export function multiplicationBlock(a: number, b: number): BlockResult {
    return { success: true, result: a * b };
}
