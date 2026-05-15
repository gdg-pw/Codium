import { BlockResult } from "@/app/blocks/BlockResult";

// Returns every index in [startIndex, endIndex) as a BlockResult.
export function getForLoopSequence(
    startIndex: number,
    endIndex: number
): BlockResult<number[]> {
    if (!Number.isInteger(startIndex) || !Number.isInteger(endIndex)) {
        return { success: false, error: "startIndex and endIndex must be integers." };
    }
    if (startIndex > endIndex) {
        return { success: false, error: "startIndex must be less than or equal to endIndex." };
    }
    const sequence: number[] = [];
    for (let i = startIndex; i < endIndex; i++) {
        sequence.push(i);
    }
    return { success: true, value: sequence };
}
