import { Button } from "@/src/components/ui/button";
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/src/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog";
import { Label } from "@/src/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/components/ui/popover";
import { Check, CircleEllipsis, Send, X } from "lucide-react";
import * as React from "react";
import { useContext } from "react";
import { AuthContext } from "@/src/context/authContext";

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

export function PropostasCard({ proj, key }: { proj: Project, key: number }) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const { user } = useContext(AuthContext);

    const handleSelect = (institutoValue: string) => {
        setValue(institutoValue);
        setOpen(false);
    };

    const handleAccept = () => {
        console.log("Proposta aceita:", proj.nome);
    };

    const handleReject = () => {
        console.log("Proposta rejeitada:", proj.nome);
    };

    return (
        /* Para ficar em formato de grid, o map que chamar essa função precisa está envelopado com uma div, exemplo em Temp.tsx do cliente*/
        <div>
            <Card key={key} className="relative p-4 border-black border-solid">
                <div className="flex items-center justify-between">
                    <div className="flex-1 flex flex-col items-start w-full">
                        <CardTitle className="text-xl font-semibold mb-2 text-gray-800 truncate w-full">
                            {proj?.nome.length > 20 ? proj?.nome.substring(0, 20) + "..." : proj?.nome}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-700 mb-3 truncate w-full">
                            {proj?.descricao.length > 27 ? proj?.descricao.substring(0, 27) + "..." : proj?.descricao}
                        </CardDescription>
                        {/* <p className="text-sm text-gray-500">
                            Status: <span className="font-medium text-gray-800">{getStatusDescription(proj.status)}</span>
                        </p> */}
                        <p className="text-sm text-gray-500">
                            Instituto: <span className="font-medium text-gray-800">IFAM-CMC</span>
                        </p>
                    </div>


                    <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-transparent border-none shadow-none p-0 hover:none">
                                    <CircleEllipsis className="w-6 h-6 text-custom-green" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto bg-white shadow-lg p-6 rounded-lg">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-semibold mb-4">{proj.nome}</DialogTitle>
                                    <DialogDescription className="text-base text-muted-foreground mb-6">
                                        {proj.descricao}<br />
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Label className="font-medium w-1/3">Privacidade:</Label>
                                        <p className="w-2/3">
                                        {proj.publico ? "Público" : "Privado"}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Label className="font-medium w-1/3">Status:</Label>
                                        <p className="w-2/3">{getStatusDescription(proj.status)}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Label className="font-medium w-1/3">Instituto:</Label>
                                        <p className="w-2/3">IFAM</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Label className="font-medium w-1/3">Previsão de Início:</Label>
                                        <p className="w-2/3">01/09/2024</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Label className="font-medium w-1/3">Previsão de Conclusão:</Label>
                                        <p className="w-2/3">01/02/2025</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Label className="font-medium w-1/3">Estimativa de Valor:</Label>
                                        <p className="w-2/3">R$: 1.000.000,00</p>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-6 space-x-3">
                                    <Button
                                        onClick={handleAccept}
                                        className="bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center px-4 py-2"
                                    >
                                        <Check className="mr-2" />
                                        Aceitar
                                    </Button>
                                    <Button
                                        onClick={handleReject}
                                        className="bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center px-4 py-2"
                                    >
                                        <X className="mr-2" />
                                        Rejeitar
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </Card>
        </div>
    );
}