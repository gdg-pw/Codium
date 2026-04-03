import {MathBlock} from "@/app/blocks/BaseBlock";
import React from "react";

//===============================
//        INPUTS
//===============================
type AddInputs = number[];


//===============================
//        VISUAL
//===============================
const AddBlockUI: React.FC<any> = ({ data }) => {
    return (
        <div className="p-2 bg-blue-100 rounded border border-blue-500">
            <div className="font-bold text-blue-900 mb-2">
                TODO
            </div>
            <div className="text-xs text-gray-600">
                Jakies ui do tego
            </div>
        </div>
    );
};



//===============================
//        LOGIC
//===============================
export const addBlock: MathBlock<AddInputs> = {
    id: "add",
    name: "Dodawanie Wiele",
    category: "math",
    execute: (inputs) => {
        const result = inputs.reduce((sum, current) => sum + current, 0);

        if (!Number.isFinite(result)) {
            return {
                success: false,
                error: "Overflow: Wynik przekracza bezpieczny zakres liczb całkowitych."
            };
        }

        // inputs.values to nasza gwarantowana tablica
        return {
            success: true,
            value: result
        };
    },
    visuals: {
        //two inputs
        inputs: [
            { id: "value1", label: "" },
            { id: "value2", label: "" }
        ],
        outputs: [
            { id: "result", label: "" }
        ],
        component: AddBlockUI //TSX UI
    }
};
