import {BlockResult} from "@/app/mathBlocks/BlockResult";

export function additionBlock(a: number, b: number): BlockResult {
    const result = a + b;

    if (!Number.isFinite(result)) {
        return {
            success: false,
            error: "Overflow: Wynik przekracza bezpieczny zakres liczb całkowitych."
        };
    }

    return { success: true, result: result };
}