import { Button } from "@/src/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog";


import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/components/ui/popover";

import { CircleEllipsis, Send } from "lucide-react";
import { Textarea } from "@/src/components/ui/textarea";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/src/components/ui/command";
import { useContext } from "react";
import { AuthContext } from "@/src/context/authContext";

const institutos = [
    {
        value: "IFAM",
        label: "IFAM",
    },
    {
        value: "UEA",
        label: "UEA",
    },
    {
        value: "UFAM",
        label: "UFAM",
    },
]

interface Project {
    nome: string;
    descricao: string;
    publico: boolean;
    status: number;
}

function getStatusDescription(status: number): string {
    switch (status) {
        case 0:
            return "Não iniciado";
        case 1:
            return "Iniciado";
        case 2:
            return "Finalizado";
        case 3:
            return "Cancelado";
        default:
            return "Desconhecido";
    }
}

export function ProjectCard({ proj }: { proj: Project }) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const { user } = useContext(AuthContext);

    const handleSelect = (institutoValue: string) => {
        setValue(institutoValue);
        setOpen(false);
    };

    return (
        /* Para ficar em formato de grid, o map que chamar essa função precisa está envelopado com uma div, exemplo em Temp.tsx do cliente*/
        <div>
            <Card className="relative p-4 border-black border-solid">
                <div className="flex items-center justify-between">
                    <div className="flex-1 flex flex-col items-start w-full">
                        <CardTitle className="text-xl font-semibold mb-2 text-gray-800 truncate w-full">
                            {proj?.nome.length > 20 ? proj?.nome.substring(0, 20) + "..." : proj?.nome}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-700 mb-3 truncate w-full">
                            {proj?.descricao.length > 27 ? proj?.descricao.substring(0, 27) + "..." : proj?.descricao}
                        </CardDescription>
                        <p className="text-sm text-gray-500">
                            Status: <span className="font-medium text-gray-800">{getStatusDescription(proj.status)}</span>
                        </p>
                    </div>


                    <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                        {user?.cliente && (<form action="#">
                            <Popover key={"pop1"}>
                                <PopoverTrigger asChild>
                                    <Button className="bg-transparent border-none shadow-none p-0 hover:none">
                                        <Send className="w-6 h-6 text-custom-green" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <h4 className="font-medium leading-none">Enviar</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Escolha um instituto para enviar uma proposta de seu projeto.
                                            </p>
                                        </div>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild >
                                                <div>
                                                    <Label className="text-base font-medium mb-2">
                                                        Institutos: <br />
                                                    </Label>
                                                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-[285px] justify-between">
                                                        {value ? institutos.find((instituto) => instituto.value === value)?.label : "Selecione o Instituto..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[285px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Selecione o Instituto..." />
                                                    <CommandList>
                                                        <CommandEmpty>Nenhum instituto encontrado.</CommandEmpty>
                                                        <CommandGroup>
                                                            {institutos.map((instituto) => (
                                                                <CommandItem
                                                                    key={instituto.value}
                                                                    value={instituto.value}
                                                                    
                                                                    onSelect={(currentValue) => {
                                                                        setValue(currentValue === value ? "" : currentValue)
                                                                        setOpen(false)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            value === instituto.value ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {instituto.label}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <div>
                                            <Label>Mensagem de contato...
                                                <Textarea placeholder="Escreva sua mensagem..." className="mt-1 focus-visible:ring-custom-green" />
                                            </Label>
                                        </div>
                                        <Button className="bg-custom-green text-black font-bold hover:text-white mt-4">
                                            Enviar
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </form>)}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-transparent border-none shadow-none p-0 hover:none">
                                    <CircleEllipsis className="w-6 h-6 text-custom-green" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto bg-white shadow-lg p-6">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-semibold mb-4">{proj.nome}</DialogTitle>
                                    <DialogDescription className="text-base text-muted-foreground mb-6">
                                        {proj.descricao}<br />
                                        {proj.publico ? "Público" : "Privado"}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div>
                                        <Label className="font-medium">Status:</Label>
                                        <p>{getStatusDescription(proj.status)}</p>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </Card>
        </div>
    );
}