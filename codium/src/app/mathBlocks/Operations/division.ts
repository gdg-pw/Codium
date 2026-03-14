import {BlockResult} from "@/app/mathBlocks/BlockResult";

export function divisionBlock(a: number, b: number): BlockResult {
    if (b === 0) {
        return { success: false, error: "Division by zero is not allowed." };
    }
    const result = a/b;

    if (!Number.isFinite(result)) {
        return {
            success: false,
            error: "Overflow: Wynik przekracza bezpieczny zakres liczb całkowitych."
        };
    }

    return { success: true, result: result };
}