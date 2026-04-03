// import {additionBlock} from "@/app/blocks/math_blocks/Operations/add";
// import {subtractionBlock} from "@/app/blocks/math_blocks/Operations/substract";
// import {multiplicationBlock} from "@/app/blocks/math_blocks/Operations/multiplication";
// import {divisionBlock} from "@/app/blocks/math_blocks/Operations/division";
// import {BaseBlock} from "@/app/blocks/BaseBlock";
//
// export type BlockType = "add" | "subtract" | "multiply" | "divide";
//
// export function runBlock(type: BlockType, a: number, b: number): BaseBlock {
//     switch (type) {
//         case "add":
//             return additionBlock(a, b);
//         case "subtract":
//             return subtractionBlock(a, b);
//         case "multiply":
//             return multiplicationBlock(a, b);
//         case "divide":
//             return divisionBlock(a, b);
//         default:
//             return { success: false, error: `Unknown block type: ${type}` };
//     }
// }