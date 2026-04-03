import {BaseBlock} from "@/app/blocks/BaseBlock";

export function subtractionBlock(a: number, b: number): BaseBlock {
    const result = a - b;

    if (!Number.isFinite(result)) {
        return {
            success: false,
            error: "Overflow: Wynik przekracza bezpieczny zakres liczb całkowitych."
        };
    }

    return { success: true, result: result };
}