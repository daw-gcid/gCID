"use client";
import { AuthContext } from "@/src/context/authContext";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import GetProjects from "../data/request";
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

  if(!user) return null;
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-semibold">Projetos</h1>
      </div>
      <div>{isUserLoading ? <ProjectsSkeleton /> : <ComponentsManager />}</div>
    </div>
  );
}
