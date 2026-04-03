interface ForLoopParams {
  startIndex: number;
  endIndex: number;
}

export function getForLoopSequence(params: ForLoopParams): number[] {
  const { startIndex, endIndex } = params;
  const sequence: number[] = [];

  if (startIndex <= endIndex) {
    for (let i = startIndex; i <= endIndex; i++) {
      sequence.push(i);
    }
  } else {
    for (let i = startIndex; i >= endIndex; i--) {
      sequence.push(i);
    }
  }

  return sequence;
}