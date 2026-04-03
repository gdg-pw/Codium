import {AnyGameBlock} from "@/app/blocks/BaseBlock";
import {addBlock} from "@/app/blocks/math_blocks/Operations/add";

export const blocksRegistry: Record<string, AnyGameBlock> = {
    "add": addBlock,
};