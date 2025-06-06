/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectSelect } from "./ObjectSelect";
import { useState } from "react";


type item = {
    value: number | string ;
    description: string;
}


type props = {
    items: item[]; 
    name: string;
    placeholder: string;
    label:string;
}

export default function MultiSelect({items, name, placeholder, label}: props) {
    const [currItem, setCurrItem] = useState();
    const [currItens, setCurItens] = useState<any[]>([]);

    const handleAdd = () => {
        const values = currItens.map((item:any) => item.value);

        if (!values.includes(currItem?.value)){
            setCurItens([...currItens, currItem]);
        }
    }

    return (
        <div className="w-full flex flex-col gap-2 mt-6">

            <div className="flex gap-2 items-end h-10">
                <ObjectSelect items={items} onChange={(item: any) => {setCurrItem(item)}} name={name} placeholder={placeholder} label={label} value={currItem != undefined ? currItem.value : null} getObject/>
                <button className="w-fit p-2 rounded text-white h-full bg-blue-600 hover:cursor-pointer" onClick={handleAdd}>Adicionar</button>
            </div>

            <div className="w-full h-[200px] border border-gray-400 flex flex-col rounded overflow-y-auto">

                {currItens?.map((item: any) => {
                    return <div className="p-2 pl-4 hover:bg-gray-100">
                        {item.description}
                    </div>
                })
                }

            </div>


        </div>
    )
}