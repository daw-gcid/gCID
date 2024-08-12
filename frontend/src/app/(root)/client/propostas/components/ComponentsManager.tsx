
import { useQueryClient } from "@tanstack/react-query";
import { ProjectsSkeleton } from "../../projetos/components/ProjectSkeleton";
import { NoProjects } from "../../projetos/components/NoProjects";
import { PropostasList } from "./Temp";

interface Project {
  nome: string;
  descricao: string;
  publico: boolean;
  status: number;
}

export function PropostasComponentsManager() {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData(["get-projects"]);
  const isLoading = !queryData;
  const isFetched = !!queryData;
  const projects = queryData as Project[];

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  if (isFetched && projects && projects.length > 0) {
    return <PropostasList proj={projects} />;
  }

  return <NoProjects />;
}
