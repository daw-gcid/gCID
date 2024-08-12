import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { DialogClose } from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { AuthContext } from "@/src/context/authContext";
import { FormEvent, useContext, useState } from "react";
import { createProjeto } from "../../data/request";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Info } from "lucide-react";
import { Label } from "@/src/components/ui/label";

export function FormCreateProject() {
  const { user } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [publico, setPublico] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const projeto = {
      nome: nome,
      descricao: descricao,
      publico: publico,
      clienteId: user?.cliente?.id,
    };
    const resposta = await createProjeto(projeto);

    console.log(resposta);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div>
        <Label>
          Nome do projeto
          <Input
            className="mt-1 focus-visible:ring-custom-green"
            onChange={(e) => setNome(e.target.value)}
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
          <Button type="button" variant="secondary" className="py-2 px-4 text-base ">
            Fechar
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="py-2 px-4 text-base bg-custom-blue text-white"
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
