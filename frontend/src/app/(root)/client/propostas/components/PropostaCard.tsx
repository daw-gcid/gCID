import { Button } from "@/src/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Label } from "@/src/components/ui/label";
import { Check, CircleEllipsis, X } from "lucide-react";
import * as React from "react";
import { Proposta } from "./ComponentsManager";
import { useMutation } from "@tanstack/react-query";
import { acceptProposal, refuseProposal } from "../../data/request";
import { toast } from "react-toastify";


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
  ("");
}

export function EnviadoCard({ proposta }: { proposta: Proposta }) {

  const [openDialog, setOpenDialog] = React.useState(false);

  function formatDate(date: Date): string {
    const day = String(date?.getDate()).padStart(2, "0");
    const month = String(date?.getMonth() + 1).padStart(2, "0");
    const year = date?.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    /* Para ficar em formato de grid, o map que chamar essa função precisa está envelopado com uma div, exemplo em Temp.tsx do cliente*/
    <div>
      <Card className="relative p-4 border-black border-solid">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex flex-col items-start w-full">
            <CardTitle className="text-xl font-semibold mb-2 text-gray-800 truncate w-full">
              {proposta?.projeto?.nome.length > 20
                ? proposta?.projeto?.nome.substring(0, 20) + "..."
                : proposta?.projeto?.nome}
            </CardTitle>
            <CardDescription className="text-sm text-gray-700 mb-3 truncate w-full">
              {proposta?.descricao?.length > 27
                ? proposta?.descricao?.substring(0, 27) + "..."
                : proposta?.descricao}
            </CardDescription>
            {/* <p className="text-sm text-gray-500">
                            Status: <span className="font-medium text-gray-800">{getStatusDescription(proj.status)}</span>
                        </p> */}
            <p className="text-sm text-gray-500">
              Instituto:{" "}
              <span className="font-medium text-gray-800">
                {proposta.instituto.nome}
              </span>
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 flex-shrink-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-transparent border-none shadow-none p-0 hover:none"
                  onClick={() => setOpenDialog(true)}
                >
                  <CircleEllipsis className="w-6 h-6 text-custom-green" />
                </Button>
              </DialogTrigger>
              {openDialog && (
                <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto bg-white shadow-lg p-6 rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold mb-4">
                      {proposta?.projeto?.nome}
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground mb-6">
                      {proposta?.descricao}
                      <br />
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">Privacidade:</Label>
                      <p className="w-2/3">
                        {proposta?.projeto?.publico ? "Público" : "Privado"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">Status:</Label>
                      <p className="w-2/3">
                        {getStatusDescription(proposta?.projeto?.status)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">Instituto:</Label>
                      <p className="w-2/3">{proposta.instituto.nome}</p>
                    </div>
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">
                        Previsão de Início:
                      </Label>
                      <p className="w-2/3">{formatDate(proposta.previsaoInicio)}</p>
                    </div>
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">
                        Previsão de Conclusão:
                      </Label>
                      <p className="w-2/3">{formatDate(proposta.previsaoFim)}</p>
                    </div>
                    <div className="flex">
                      <Label className="font-medium w-1/3">Mensagem:</Label>
                      <p className="w-2/3">{proposta.message}</p>
                    </div>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </div>
      </Card>
    </div>
  );
}


export function RespondidoCard({ proposta }: { proposta: Proposta }) {
  
  const accept = useMutation({
    mutationKey: ["accept-proposal"],
    mutationFn: acceptProposal,
    onSuccess() {
      window.location.reload();
      toast.success("Proposta aceita com sucesso!");
      setOpenDialog(false);

    },
  });

  const reject = useMutation({
    mutationKey: ["reject-proposal"],
    mutationFn: refuseProposal,
    onSuccess() {
      toast.success("Proposta rejeitada com sucesso!");
      setOpenDialog(false);
      window.location.reload();
    },
  });
  const [openDialog, setOpenDialog] = React.useState(false);

  function formatDate(date: Date): string {
    const day = String(date?.getDate()).padStart(2, "0");
    const month = String(date?.getMonth() + 1).padStart(2, "0");
    const year = date?.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    /* Para ficar em formato de grid, o map que chamar essa função precisa está envelopado com uma div, exemplo em Temp.tsx do cliente*/
    <div>
      <Card className="relative p-4 border-black border-solid">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex flex-col items-start w-full">
            <CardTitle className="text-xl font-semibold mb-2 text-gray-800 truncate w-full">
              {proposta?.projeto?.nome.length > 20
                ? proposta?.projeto?.nome.substring(0, 20) + "..."
                : proposta?.projeto?.nome}
            </CardTitle>
            <CardDescription className="text-sm text-gray-700 mb-3 truncate w-full">
              {proposta?.descricao?.length > 27
                ? proposta?.descricao?.substring(0, 27) + "..."
                : proposta?.descricao}
            </CardDescription>
            {/* <p className="text-sm text-gray-500">
                            Status: <span className="font-medium text-gray-800">{getStatusDescription(proj.status)}</span>
                        </p> */}
            <p className="text-sm text-gray-500">
              Instituto:{" "}
              <span className="font-medium text-gray-800">
                {proposta.instituto.nome}
              </span>
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 flex-shrink-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-transparent border-none shadow-none p-0 hover:none"
                  onClick={() => setOpenDialog(true)}
                >
                  <CircleEllipsis className="w-6 h-6 text-custom-green" />
                </Button>
              </DialogTrigger>
              {openDialog && (
                <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto bg-white shadow-lg p-6 rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold mb-4">
                      {proposta?.projeto?.nome}
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground mb-6">
                      {proposta?.descricao}
                      <br />
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">Privacidade:</Label>
                      <p className="w-2/3">
                        {proposta?.projeto?.publico ? "Público" : "Privado"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">Status:</Label>
                      <p className="w-2/3">
                        {getStatusDescription(proposta?.projeto?.status)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">Instituto:</Label>
                      <p className="w-2/3">{proposta.instituto.nome}</p>
                    </div>
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">
                        Previsão de Início:
                      </Label>
                      <p className="w-2/3">{formatDate(proposta.previsaoInicio)}</p>
                    </div>
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">
                        Previsão de Conclusão:
                      </Label>
                      <p className="w-2/3">{formatDate(proposta.previsaoFim)}</p>
                    </div>
                    <div className="flex">
                      <Label className="font-medium w-1/3">Mensagem enviada:</Label>
                      <p className="w-2/3">{proposta.message}</p>
                    </div>
                    <div className="flex">
                      <Label className="font-medium w-1/3">Mensagem Recebida:</Label>
                      <p className="w-2/3">{proposta.messageResposta}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6 space-x-3">
                    <Button
                      onClick={() => accept.mutate(proposta.id)}
                      className="bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center px-4 py-2"
                    >
                      <Check className="mr-2" />
                      Aceitar
                    </Button>
                    <Button
                      onClick={() => reject.mutate(proposta.id)}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center px-4 py-2"
                    >
                      <X className="mr-2" />
                      Rejeitar
                    </Button>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function AceitoCard({ proposta }: { proposta: Proposta }) {
  const [openDialog, setOpenDialog] = React.useState(false);

  function formatDate(date: Date): string {
    const day = String(date?.getDate()).padStart(2, "0");
    const month = String(date?.getMonth() + 1).padStart(2, "0");
    const year = date?.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    /* Para ficar em formato de grid, o map que chamar essa função precisa está envelopado com uma div, exemplo em Temp.tsx do cliente*/
    <div>
      <Card className="relative p-4 border-black border-solid">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex flex-col items-start w-full">
            <CardTitle className="text-xl font-semibold mb-2 text-gray-800 truncate w-full">
              {proposta?.projeto?.nome.length > 20
                ? proposta?.projeto?.nome.substring(0, 20) + "..."
                : proposta?.projeto?.nome}
            </CardTitle>
            <CardDescription className="text-sm text-gray-700 mb-3 truncate w-full">
              {proposta?.descricao?.length > 27
                ? proposta?.descricao?.substring(0, 27) + "..."
                : proposta?.descricao}
            </CardDescription>
            {/* <p className="text-sm text-gray-500">
                            Status: <span className="font-medium text-gray-800">{getStatusDescription(proj.status)}</span>
                        </p> */}
            <p className="text-sm text-gray-500">
              Instituto:{" "}
              <span className="font-medium text-gray-800">
                {proposta.instituto.nome}
              </span>
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2 flex-shrink-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="bg-transparent border-none shadow-none p-0 hover:none"
                  onClick={() => setOpenDialog(true)}
                >
                  <CircleEllipsis className="w-6 h-6 text-custom-green" />
                </Button>
              </DialogTrigger>
              {openDialog && (
                <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto bg-white shadow-lg p-6 rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold mb-4">
                      {proposta?.projeto?.nome}
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground mb-6">
                      {proposta?.descricao}
                      <br />
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">Privacidade:</Label>
                      <p className="w-2/3">
                        {proposta?.projeto?.publico ? "Público" : "Privado"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">Status:</Label>
                      <p className="w-2/3">
                        {getStatusDescription(proposta?.projeto?.status)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">Instituto:</Label>
                      <p className="w-2/3">{proposta.instituto.nome}</p>
                    </div>
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">
                        Previsão de Início:
                      </Label>
                      <p className="w-2/3">{formatDate(proposta.previsaoInicio)}</p>
                    </div>
                    <div className="flex items-center">
                      <Label className="font-medium w-1/3">
                        Previsão de Conclusão:
                      </Label>
                      <p className="w-2/3">{formatDate(proposta.previsaoFim)}</p>
                    </div>
                    <div className="flex">
                      <Label className="font-medium w-1/3">Mensagem enviada:</Label>
                      <p className="w-2/3">{proposta.message}</p>
                    </div>
                    <div className="flex">
                      <Label className="font-medium w-1/3">Mensagem Recebida:</Label>
                      <p className="w-2/3">{proposta.messageResposta}</p>
                    </div>
                    <div className="flex">
                      <Label className="font-medium w-1/3">Valor estimado:</Label>
                      <p className="w-2/3">{(`R$ ${proposta.estimativaValor},00`)}</p>
                    </div>
                  </div>
                </DialogContent>
              )}
            </Dialog>
          </div>
        </div>
      </Card>
    </div>
  );
}




// RecusadoCard.tsx
export function RecusadoCard({ proj }: { proj: Proposta }) {
  return (
    <>
    rescusado
    <br/>
    </>
  );
}
