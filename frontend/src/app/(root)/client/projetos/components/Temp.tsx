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

import { FormCreateProject } from "./FormCreateProject";

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
} from "@/src/components/ui/command";

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
];

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

export function ProjectsList({ proj }: { proj: Project[] }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

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
                  {project?.nome.length > 27
                    ? project?.nome.substring(0, 27) + "..."
                    : project?.nome}
                </CardTitle>
                <CardDescription className="text-base text-center truncate text-gray-600">
                  {project?.descricao.length > 35
                    ? project?.descricao.substring(0, 35) + "..."
                    : project?.descricao}
                </CardDescription>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <form action="#">
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
                            Escolha um instituto para enviar uma proposta de seu
                            projeto.
                          </p>
                        </div>

                        <Popover
                          key={"pop2"}
                          open={open}
                          onOpenChange={setOpen}
                        >
                          <PopoverTrigger asChild>
                            <div>
                              <Label className="text-base font-medium mb-2">
                                Institutos: <br />
                              </Label>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                              >
                                {value
                                  ? institutos.find(
                                      (instituto) => instituto.value === value
                                    )?.label
                                  : "Selecione o Instituto..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Selecione o Instituto..." />
                              <CommandEmpty>
                                Nenhum Instituto encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                {institutos.map((instituto) => (
                                  <CommandItem
                                    key={instituto.value}
                                    value={instituto.value}
                                    onSelect={(currentValue) => {
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      setOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        value === instituto.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {instituto.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        <div>
                          <Label>
                            Mensagem de contato...
                            <Textarea
                              placeholder="Escreva sua mensagem..."
                              className="mt-1 focus-visible:ring-custom-green"
                            />
                          </Label>
                        </div>

                        <Button className="bg-custom-green text-black font-bold hover:text-white mt-4">
                          Enviar
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </form>
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
                        {project.publico ? "Público" : "Privado"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div>
                        <Label className="font-medium">Status:</Label>
                        <p>{getStatusDescription(project.status)}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-0 right-0 mb-10 mr-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-custom-green text-black font-bold hover:text-white">
              Adicionar Projeto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto bg-white shadow-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold mb-4">
                Cadastre seu projeto
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground mb-6">
                Cadastre as informações do seu projeto aqui.
              </DialogDescription>
            </DialogHeader>
            <FormCreateProject />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
