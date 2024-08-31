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
  DialogClose,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { CircleEllipsis, Eye, Pen, Send, Trash } from "lucide-react";
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
import { AuthContext, Instituto } from "@/src/context/authContext";
import { toast } from "react-toastify";
import { createProposta, deleteProjeto, getInstitutes } from "../../data/request";
import { FormUpdateProject } from "./FormUpdateProject"; // Importa o componente para edição
import { DatePicker } from "@/src/components/DatePicker";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

interface Project {
  id: number;
  nome: string;
  descricao: string;
  publico: boolean;
  status: number;
  estimativaValor: number;
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
  const [selectedInstituto, setSelectedInstituto] = React.useState<Instituto | null>(null);
  const [previsaoInicio, setPrevisaoInicio] = React.useState<Date | null>(null);
  const [previsaoFim, setPrevisaoFim] = React.useState<Date | null>(null);
  const [mensagem, setMensagem] = React.useState("");

  const { data: institutos } = useQuery<Instituto[]>({
    queryKey: ["get-institutes"],
    queryFn: getInstitutes,
    enabled: !!user,
  });


  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const resposta = await deleteProjeto(proj.id);

    if (resposta.status === 200) {
      toast.success("Projeto deletado com sucesso!");
      window.location.reload();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(!selectedInstituto || !previsaoInicio || !previsaoFim || !mensagem){
      toast.error("Preencha todos os campos!");
      return;
    }
    const dataInicio = previsaoInicio?.toISOString().split("T")[0];
    const dataFim = previsaoFim?.toISOString().split("T")[0];
    
    const proposta = {
      institutoId: selectedInstituto?.id,
      clientId: user?.cliente?.id,
      projetoId: proj.id,
      message: mensagem,
      previsaoInicio: dataInicio,
      previsaoFim: dataFim,
    };

    const resposta = await createProposta(proposta);
    console.log(resposta);

    if(resposta.status === 201){
      toast.success("Proposta enviada com sucesso!");
    }

    
    setOpen(false);
    setSelectedInstituto(null);
    setPrevisaoInicio(null);
    setPrevisaoFim(null);
    setMensagem("");



    
  };

  const options = institutos?.map(instituto => ({
    value: instituto.id,
    label: instituto.nome
  }));

  return (
    <div >
      <Card className="relative p-4 border-black border-solid">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex flex-col items-start w-full">
            <CardTitle className="text-xl font-semibold mb-2 text-gray-800 truncate w-full">
              {proj?.nome.length > 20
                ? proj?.nome.substring(0, 20) + "..."
                : proj?.nome}
            </CardTitle>
            <CardDescription className="text-sm text-gray-700 mb-3 truncate w-full">
              {proj?.descricao.length > 27
                ? proj?.descricao.substring(0, 27) + "..."
                : proj?.descricao}
            </CardDescription>
            <p className="text-sm text-gray-500">
              Status:{" "}
              <span className="font-medium text-gray-800">
                {getStatusDescription(proj.status)}
              </span>
            </p>
          </div>

          <div className="flex justify-end mt-4 w-full">
            {user?.cliente && (
              <form action="#">
                <Popover key={"pop1"} open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button className="bg-transparent border-none shadow-none p-0 hover:none pcard-2">
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
                      <div>
                        <Select
                          options={options}
                          required
                          value={
                            selectedInstituto
                              ? {
                                  value: selectedInstituto.id,
                                  label: selectedInstituto.nome,
                                }
                              : null
                          }
                          onChange={(option:any) => {
                            setSelectedInstituto(
                              institutos?.find((i) => i.id === option?.value) ||
                                null
                            );
                          }}
                          placeholder="Selecione o Instituto..."
                        />
                      </div>
                      <div className="mt-4">
                        <Label>Previsão de Início:</Label>
                        <DatePicker
                          selected={previsaoInicio}
                          onChange={setPrevisaoInicio}
                        />
                      </div>
                      <div className="mt-4">
                        <Label>Previsão de Fim:</Label>
                        <DatePicker
                          selected={previsaoFim}
                          onChange={setPrevisaoFim}
                        />
                      </div>
                      <div>
                        <Label>
                          Mensagem de contato...
                          <Textarea
                            placeholder="Escreva sua mensagem..."
                            className="mt-1 focus-visible:ring-custom-green"
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                          />
                        </Label>
                      </div>
                      <Button className="bg-custom-green text-black font-bold hover:text-white mt-4" onClick={handleSubmit}>
                        Enviar
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </form>
            )}

            {/* Botão de Visualizar */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-transparent border-none shadow-none p-0 hover:none pcard-3">
                  <Eye className="w-6 h-6 text-custom-blue" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto bg-white shadow-lg p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold mb-4">
                    {proj.nome}
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground mb-6">
                    {proj.descricao}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div>
                    <Label className="font-medium">Visibilidade:</Label>
                    <p>{proj.publico ? "Público" : "Privado"}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Status:</Label>
                    <p>{getStatusDescription(proj.status)}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Botão de Editar */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-transparent border-none shadow-none p-0 hover:none pcard-4">
                  <span className="sr-only">Editar</span>
                  <Pen className="w-6 h-6 text-custom-blue" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto bg-white shadow-lg p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold mb-4">
                    Editar Projeto
                  </DialogTitle>
                </DialogHeader>
                <FormUpdateProject Project={proj} />
              </DialogContent>
            </Dialog>

            {/* Botão de Excluir */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-red border-none shadow-none p-0 hover:none pcard-5">
                  <Trash className="w-6 h-6 text-red-800" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto bg-white shadow-lg p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold mb-4">
                    Confirmar Exclusão
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <p className="text-base">
                    Tem certeza de que deseja excluir o projeto{" "}
                    <strong>{proj.nome}</strong>?
                  </p>
                  <Button
                    onClick={handleDelete}
                    className="bg-red-600 text-white mt-4"
                  >
                    Confirmar Exclusão
                  </Button>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="mt-2 text-gray-600 border-gray-400 hover:bg-gray-100"
                    >
                      Cancelar
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>
    </div>
  );
}
