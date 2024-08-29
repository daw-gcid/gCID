"use client";
import { getEquips, getProjects, getTalents } from "../data/request";
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
import { AuthContext, Talento } from "@/src/context/authContext";
import { useContext, useEffect, useState } from "react";
import { ComponentsManager } from "./components/ComponentsManager";
import { FormCreateTeam } from "./components/FormCreateTeam";
import { ProjectsSkeleton } from "./components/ProjectSkeleton";
export default function TeamsPage() {
  const { user } = useContext(AuthContext);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setIsUserLoading(false);
    }
  }, [user]);

  const { data: projects, isLoading: isProjectsLoading } = useQuery({
    queryKey: ["get-projects"],
    queryFn: () => getProjects(user!),
    enabled: !!user,
  });

  const { data: equips, isLoading: isEquipsLoading } = useQuery({
    queryKey: ["get-equips"],
    queryFn: () => getEquips(),
    enabled: !!user,
  });


  const { data: talents, isLoading: isTalentsLoading } = useQuery({
    queryKey: ["get-talents"],
    queryFn: () => getTalents(),
    enabled: !!user,
  });

  const talentos = talents?.data as Talento[];

  const isProjectsAvailable = projects && projects.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-semibold">Equipes</h1>
        {isProjectsAvailable && (
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
                  Cadastre sua equipe
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground mb-6">
                  Cadastre as informações da sua equipe aqui.
                </DialogDescription>
              </DialogHeader>
              <FormCreateTeam projects={projects} talents={talentos} />
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div>
        {isUserLoading || isProjectsLoading || isTalentsLoading ? (
          <ProjectsSkeleton />
        ) : (
          <ComponentsManager />
        )}
      </div>
    </div>
  );
}
