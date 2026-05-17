// Pure logic — no React dependency. Unchanged from original.
export function evaluateGate(gateType: string, a: boolean, b: boolean): boolean {
    switch (gateType) {
        case "AND":  return a && b;
        case "OR":   return a || b;
        case "NOT":  return !a;
        case "XOR":  return a !== b;
        case "XNOR": return a === b;
        case "NOR":  return !(a || b);
        case "NAND": return !(a && b);
        default:     return false;
    }
}
