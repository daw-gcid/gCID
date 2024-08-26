import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { DialogClose } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { AuthContext } from "@/src/context/authContext";
import { Info } from "lucide-react";
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import { updateProjeto } from "../../data/request";
import { Project } from "./ComponentsManager";

export function FormUpdateProject({ Project }: { Project: Project }) {
  const { user } = useContext(AuthContext);
  const [nome, setNome] = useState(Project.nome);
  const [descricao, setDescricao] = useState(Project.descricao);
  const [publico, setPublico] = useState(Project.publico);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const projeto = {
      nome: nome,
      descricao: descricao,
      publico: publico,
      clienteId: user?.cliente?.id,
    };
    const resposta = await updateProjeto(Project.id, projeto);
    console.log(resposta);
    if (resposta.status === 200) {
      toast.success("Projeto atualizado com sucesso!");
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div>
        <Label>
          Nome do projeto
          <Input
            className="mt-1 focus-visible:ring-custom-green"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
          />
        </Label>
      </div>
      <div>
        <Label>
          Descrição do projeto
          <Textarea
            placeholder="Escreva sua descrição."
            className="mt-1 focus-visible:ring-custom-green"
            onChange={(e) => setDescricao(e.target.value)}
            value={descricao}
          />
        </Label>
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Checkbox
          className="w-5 h-5 border-gray-300 rounded checked:bg-custom-green checked:border-transparent focus:ring-custom-green"
          checked={publico}
          onCheckedChange={(checked) => setPublico(checked as boolean)}
        />
        <Label className="flex gap-2 items-center">
          <span>Público</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="size-4 text-slate-500" />
              </TooltipTrigger>
              <TooltipContent className="max-w-52">
                Define a visibilidade do seu projeto, permitindo que Institutos
                visualizem sua demanda e entre em contato!
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <DialogClose>
          <Button
            type="button"
            variant="secondary"
            className="py-2 px-4 text-base "
          >
            Fechar
          </Button>
          <Button
            type="submit"
            className="py-2 px-4 text-base bg-custom-blue text-white"
          >
            Salvar
          </Button>
        </DialogClose>
      </div>
    </form>
  );
}
