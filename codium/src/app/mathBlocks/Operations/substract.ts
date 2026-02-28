import {BlockResult} from "@/app/mathBlocks/BlockResult";

export function subtractionBlock(a: number, b: number): BlockResult {
    return { success: true, result: a - b };
}