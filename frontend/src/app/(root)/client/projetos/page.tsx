"use client";
import GetProjects from "../data/request";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/src/components/ui/button";
import { CirclePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { AuthContext } from "@/src/context/authContext";
import { useContext, useEffect, useState } from "react";
import { ComponentsManager } from "./components/ComponentsManager";
import { ProjectsSkeleton } from "./components/ProjectSkeleton";

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
      <div className="flex gap-4 items-center">
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
          <DialogContent>a</DialogContent>
        </Dialog>
      </div>
      <div>{isUserLoading ? <ProjectsSkeleton /> : <ComponentsManager />}</div>
    </div>
  );
}
