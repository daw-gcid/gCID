import { ProjectsSkeleton } from "../../projetos/components/ProjectSkeleton";
import { PropostasList } from "./Temp";
import { NoProjects } from "../../projetos/components/NoProjects";
import { useQueryClient } from "@tanstack/react-query";
import { Project } from "../../projetos/components/ComponentsManager";

export interface Proposta {
  projeto: Project;
  descricao: string;
  aceito: boolean;
  message: string;
  cliente: object;
  instituto: object;
}

export function PropostasComponentsManager() {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData(["get-proposals"]);
  const isLoading = !queryData;
  const isFetched = !!queryData;
  const proposals = queryData as Proposta[];

  console.log(queryData);

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  if (isFetched && proposals && proposals.length > 0) {
    return <PropostasList proj={proposals} />;
  }

  return <NoProjects />;
}
