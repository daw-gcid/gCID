import { Cliente, Instituto } from "@/src/context/authContext";
import { useQueryClient } from "@tanstack/react-query";
import { Project } from "../../projetos/components/ComponentsManager";
import { ProjectsSkeleton } from "../../projetos/components/ProjectSkeleton";
import { PropostasList } from "./PropostasList";

export interface Proposta {
  id: string;
  projeto: Project;
  descricao: string;
  aceito: boolean;
  message: string;
  messageResposta: string;
  estimativaValor: number;
  previsaoInicio: Date;
  previsaoFim: Date;
  cliente: Cliente;
  instituto: Instituto;
  status: number;
}

function convertToDateWithoutTimezone(date: string | Date): Date {
  if (typeof date === "string") {
    // Extrai apenas a parte da data (ano, mês, dia) e cria um novo objeto Date sem ajuste de fuso horário
    const [year, month, day] = date.split("T")[0].split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  return date;
}

export function PropostasComponentsManager() {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData(["get-proposals"]);
  const isLoading = !queryData;
  const isFetched = !!queryData;
  const proposals = queryData
    ? (queryData as Proposta[]).map((proposal) => ({
        ...proposal,
        previsaoInicio: convertToDateWithoutTimezone(proposal.previsaoInicio),
        previsaoFim: convertToDateWithoutTimezone(proposal.previsaoFim),
      }))
    : [];

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  if (isFetched && proposals) {
    return <PropostasList proj={proposals} />;
  }
}
