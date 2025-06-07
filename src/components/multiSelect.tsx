/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectSelect } from "./ObjectSelect";
import { useMemo, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";


type item = {
    value: number | string ;
    description: string;
}


type props = {
    items: item[]; 
    name: string;
    placeholder: string;
    label:string;
    onChange: (value: any) => void;
    value: any[]
}

export default function MultiSelect({items, name, placeholder, label, onChange, value = []}: props) {
    const [currItem, setCurrItem] = useState<any>();
    const availableItems = useMemo(() => {

        const currItensValues = value.map((item: any) => item.value);
        return items.filter((item) => !currItensValues.includes(item.value));

    }, [items, value]);

    const handleAdd = (event: any) => {
        event.stopPropagation();
        const values = value.map((item:any) => item.value);

        if (!values.includes(currItem?.value)){
            const new_data = [...value, currItem]; 
            onChange(new_data);
        }

        setCurrItem(null);
    }

    const handleRemove = (removedItem: any) => {
        const newList = value.filter((item:any) => item.value != removedItem.value);
        onChange(newList);
    }

    return (
        <div className="w-full flex flex-col gap-2 mt-6">

            <div className="flex gap-2 items-end h-10">
                <ObjectSelect items={availableItems} onChange={(item: any) => {setCurrItem(item)}} name={name} placeholder={placeholder} label={label} value={currItem != undefined ? currItem.value : null} getObject/>
                <button type="button" className="w-fit p-2 rounded text-white h-full bg-blue-600 hover:cursor-pointer" onClick={handleAdd}>Adicionar</button>
            </div>

            <div className="w-full h-[200px] border flex flex-col rounded overflow-y-auto">

                {value?.map((item: any) => {
                    return <div className="p-2 pl-4 pr-4 hover:bg-gray-100 flex justify-between items-center">
                        <span>{item.description}</span>
                        <XCircleIcon onClick={() => {handleRemove(item)}} className="h-6 w-6 text-red-600 hover:cursor-pointer" />
                    </div>
                })
                }

            </div>


        </div>
    )
}