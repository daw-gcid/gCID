import { useQueryClient } from "@tanstack/react-query";
import { ProjectsSkeleton } from "../../../talento/projetos/components/ProjectSkeleton";
import { ProjectsList } from "../../projetos/components/ProjectList";
import { NoProjects } from "../../projetos/components/NoProjects";

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

export function ComponentsManager() {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData(["get-equips"]);
  const isLoading = !queryData;
  const isFetched = !!queryData;
  const projects = queryData as Project[];

  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  if (isFetched && projects && projects.length > 0) {
    return <ProjectsList proj={projects} />;
  }

  return <NoProjects />;
}
