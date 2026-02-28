export type BlockResult =
    | { success: true; result: number }
    | { success: false; error: string };