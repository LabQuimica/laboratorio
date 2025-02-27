'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

import { useToast } from "@/hooks/use-toast";
import { useCreatePractica } from "@/hooks/Practicas/usePractica";

function AddPractica() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const createPractica = useCreatePractica();

    const { toast } = useToast();

    return (
        <div className="z-50">
            <Link href="/menu/practica/crear-practica" passHref>
                <Button className="flex flex-row rounded-sm items-center justify-center align-middle">
                    <span className="text-xl">+</span>
                    <p className="h-full">Nueva Práctica</p>
                </Button>
            </Link>
        </div>
    );
}

export default AddPractica;