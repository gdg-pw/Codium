export function evaluateGate(gateType: string, a: boolean, b: boolean = false): boolean {
  switch (gateType) {
    case 'AND':
      return a && b;
    case 'OR':
      return a || b;
    case 'NOT':
      return !a; // NOT ignoruje wejście 'b'
    case 'XOR':
      return a !== b;
    case 'XNOR':
      return a === b;
    case 'NOR':
      return !(a || b);
    case 'NAND':
      return !(a && b);
    default:
      return false;
  }
}