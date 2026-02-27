import {BlockResult} from "@/app/mathBlocks/BlockResult";

export function additionBlock(a: number, b: number): BlockResult {
    return { success: true, result: a + b };
}