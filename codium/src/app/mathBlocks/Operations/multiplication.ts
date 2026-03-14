import {BlockResult} from "@/app/mathBlocks/BlockResult";

export function multiplicationBlock(a: number, b: number): BlockResult {
    const result = a * b;

    if (!Number.isFinite(result)) {
        return {
            success: false,
            error: "Overflow: Wynik przekracza bezpieczny zakres liczb całkowitych."
        };
    }

    return { success: true, result: result };
}
