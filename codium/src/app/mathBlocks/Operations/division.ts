import {BlockResult} from "@/app/mathBlocks/BlockResult";

export function divisionBlock(a: number, b: number): BlockResult {
    if (b === 0) {
        return { success: false, error: "Division by zero is not allowed." };
    }
    return { success: true, result: a / b };
}