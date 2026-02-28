import {runBlock} from "@/app/mathBlocks/BlockRunner";

const result = runBlock("multiply", 3, 7);
if (result.success) {
    console.log(result.result); // 21
} else {
    console.log(result.error);
}