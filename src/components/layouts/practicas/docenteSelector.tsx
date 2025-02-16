"use client";
import { useState } from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"  

import { usePracticas } from "@/hooks/Practicas/usePractica2";

type DocenteSelectorProps = {
    onDocenteSelect: (id: number, name: string) => void;
};

const DocenteSelector = ({ onDocenteSelect }: DocenteSelectorProps) => {
    const { docentesData } = usePracticas();

    const options = docentesData.data?.map((docente) => ({
        value: docente.id_user, 
        label: docente.name
    })) || []

    return (
        <div className='border border-black dark:border-white rounded-sm w-fit mt-3 mb-5'>
            <Select>
                <SelectTrigger className="w-56">
                    <SelectValue placeholder="Seleccione el docente..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Docente</SelectLabel>
                        {docentesData.data?.map((docente) => (
                            <SelectItem key={docente.id_user} value={String(docente.id_user)}>
                            {docente.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default DocenteSelector;