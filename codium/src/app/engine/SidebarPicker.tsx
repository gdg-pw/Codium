"use client";

import NodeDraggable from "@/app/engine/NodeDraggable";
import style from "./css/GamePickerBar.module.css"
import Image from "next/image";

export default function SidebarPicker() {

    const img = <Image src={"/dog.svg"} alt="asdasd" width={100} height={100}/>;

    return (
        <div className={style.gamePickerBar}>

            {
                //a bunch of test items
            }
            <NodeDraggable type="test1" title="TestItem1" icon={img} />
            <NodeDraggable type="test2" title="TestItem2" icon={img} />
            <NodeDraggable type="test3" title="TestItem3" icon={img} />
            <NodeDraggable type="test4" title="TestItem4" icon={img} />
            <NodeDraggable type="test5" title="TestItem5" icon={img} />
            <NodeDraggable type="test1" title="TestItem6" icon={img} />
            <NodeDraggable type="test2" title="TestItem7" icon={img} />
            <NodeDraggable type="test3" title="TestItem8" icon={img} />
            <NodeDraggable type="test4" title="TestItem9" icon={img} />
            <NodeDraggable type="test5" title="TestItem10" icon={img} />
            <NodeDraggable type="test6" title="TestItem11" icon={img} />
        </div>
    );
}