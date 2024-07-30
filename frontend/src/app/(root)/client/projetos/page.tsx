"use client";
import GetProjects from "../data/request";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/src/components/ui/button";
import { CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { AuthContext } from "@/src/context/authContext";
import { useContext, useEffect, useState } from "react";
import { ComponentsManager } from "./components/ComponentsManager";
import { ProjectsSkeleton } from "./components/ProjectSkeleton";
import { FormCreateProject } from "./components/FormCreateProject";

export default function ProjectsPage() {
  const { user } = useContext(AuthContext);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setIsUserLoading(false);
    }
  }, [user]);

  useQuery({
    queryKey: ["get-projects"],
    queryFn: () => GetProjects(user!),
    enabled: !!user,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-semibold">Projetos</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full text-custom-green bg-transparent"
            >
              <CirclePlus className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
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
      <div>{isUserLoading ? <ProjectsSkeleton /> : <ComponentsManager />}</div>
    </div>
  );
}
