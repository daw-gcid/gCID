"use client";
import { getProposals } from "../data/request";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "@/src/context/authContext";
import { useContext, useEffect, useState } from "react";
import { ProjectsSkeleton } from "../projetos/components/ProjectSkeleton";
import { PropostasComponentsManager } from "./components/ComponentsManager";

export default function ProposalPage() {
  const { user } = useContext(AuthContext);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      setIsUserLoading(false);
    }
  }, [user]);

  useQuery({
    queryKey: ["get-proposals"],
    queryFn: () => getProposals(user!),
    enabled: !!user,
  });

  return (
    <div className="h-screen">
      <div>
        <h1 className="text-2xl font-semibold">Propostas</h1>
      </div>
        {isUserLoading ? <ProjectsSkeleton /> : <PropostasComponentsManager />}
    </div>
  );
}
