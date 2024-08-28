"use client";
import { AuthContext } from "@/src/context/authContext";
import { useContext } from "react";

import { Card, CardDescription, CardTitle } from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { CircleEllipsis, PenIcon } from "lucide-react";
import { Label } from "@/src/components/ui/label";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateStatus } from "../../data/request";


interface Project {
  id: string;
  nome: string;
  descricao: string;
  publico: boolean;
  status: number;
  cliente: Cliente;
}

interface Cliente {
  nome: string;
  email: string;
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

export function ProjectsList({ proj }: { proj: Project[] }) {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);


  if (!user) return null;

  const HandleUpdateStatus = (id: string, status: number) => async () => {
    const resposta = await updateStatus(id, status);
    if (resposta.status === 201) {
      toast.success("Status atualizado com sucesso");
      window.location.reload();
    } else {
      toast.error("Erro ao atualizar status");
      window.location.reload();

    }
    setOpen(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {proj.map((project, index) => (
          <Card
            key={index}
            className="relative border-solid border-gray-600 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 flex flex-col items-start">
                <CardTitle className="text-lg font-bold mb-2 text-center truncate">
                  {`${project?.nome} - ${project?.cliente.nome}`}
                </CardTitle>
                <CardDescription className="text-base text-center truncate text-gray-600">
                  {project?.descricao.length > 35
                    ? project?.descricao.substring(0, 35) + "..."
                    : project?.descricao}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-end space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-transparent border-none shadow-none p-0 hover:none">
                    <CircleEllipsis className="w-6 h-6 text-custom-green" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto bg-white shadow-lg p-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold mb-4">
                      {project.nome}
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground mb-6">
                      {project.descricao}
                      <br />
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div>
                      <Label className="font-medium">Cliente:</Label>
                      <p>{project.cliente.nome}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Status:</Label>
                      <p>{getStatusDescription(project.status)}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              {/* Botão de controlar projeto */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-transparent border-none shadow-none p-0 hover:none">
                    <PenIcon className="w-6 h-6 text-custom-green" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto bg-white shadow-lg p-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold mb-4">
                      {project.nome}
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground mb-6">
                      {project.descricao}
                      <br />
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div>
                      <Label className="font-medium">Cliente:</Label>
                      <p>{project.cliente.nome}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Status:</Label>
                      <p>{getStatusDescription(project.status)}</p>
                    </div>
                  </div>
                  {project.status === 0 && (
                    <Button
                      onClick={HandleUpdateStatus(project.id, 1)}
                      className="bg-custom-blue text-white mt-4"
                    >
                      Iniciar Projeto
                    </Button>
                  )}
                  {project.status === 1 && (
                    <Button
                      onClick={HandleUpdateStatus(project.id, 2)}
                      className="bg-custom-green text-white mt-4"
                    >
                      Finalizar Projeto
                    </Button>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
