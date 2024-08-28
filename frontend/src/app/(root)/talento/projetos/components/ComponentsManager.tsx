import { ProjectsSkeleton } from "./ProjectSkeleton";
import { ProjectsList } from "./Temp";
import { NoProjects } from "./NoProjects";
import { useQueryClient } from "@tanstack/react-query";

export interface Project {
  nome: string;
  descricao: string;
  publico: boolean;
  status: number;
  estimativaValor: number;
}

export function ComponentsManager() {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData(["get-projects"]);
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
