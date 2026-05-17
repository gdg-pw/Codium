export type BlockResult<T> =
    | { success: true; value: T }
    | { success: false; error: string };
