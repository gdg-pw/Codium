import { AnyGameBlock } from "@/app/blocks/BaseBlock";
import { addBlock } from "@/app/blocks/math_blocks/Operations/add";
import { subtractBlock } from "@/app/blocks/math_blocks/Operations/subtract";
import { multiplyBlock } from "@/app/blocks/math_blocks/Operations/multiply";
import { divisionBlock } from "@/app/blocks/math_blocks/Operations/division";
import { logicGateBlock } from "@/app/blocks/logic_blocks/logicGateBlock";
import { forLoopBlock } from "@/app/blocks/loop_blocks/forLoopBlock";

export const blocksRegistry: Record<string, AnyGameBlock> = {
    "add":        addBlock,
    "subtract":   subtractBlock,
    "multiply":   multiplyBlock,
    "division":   divisionBlock,
    "logic_gate": logicGateBlock,
    "for_loop":   forLoopBlock,
};
