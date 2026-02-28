"use client";

import NodeDraggable from "@/app/engine/NodeDraggable";
import style from "./css/SidebarPicker.module.css"
import Image from "next/image";

export default function SidebarPicker() {

    const img = <Image src={"/dog.svg"} alt="asdasd" width={100} height={100}/>;

    return (
        <div className={style.sidebarPicker}>

            {
                //a bunch of test items
            }
            <NodeDraggable type="test1" title="TestItem1" icon={img} />
            <NodeDraggable type="test2" title="TestItem2" icon={img} />
        </div>
    );
}