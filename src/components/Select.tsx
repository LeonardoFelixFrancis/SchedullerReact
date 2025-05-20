/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useState } from "react";

import {
  Select as SdnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  placeholder: string;
  selectValue: (value: any) => void;
  items: any[];
  label: string;
};

export function SelectObject({ placeholder, selectValue, items, label }: Props) {

    const handleSelect = (value: string) => {
        const selectedObj = items.filter((item) => String(item.id) == value);
        selectValue(selectedObj);
    }   

    return (
    <SdnSelect onValueChange={(value: string) => handleSelect(value)}>
        <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
        </SelectTrigger>
            <SelectContent>
            <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {items.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                    {item.description}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
    </SdnSelect>
    );
}
