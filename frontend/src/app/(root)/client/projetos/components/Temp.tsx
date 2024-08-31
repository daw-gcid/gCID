import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { ProjectCard } from "./ProjectCard";
import * as React from "react";
import { Button } from "@/src/components/ui/button";
import { FormCreateProject } from "./FormCreateProject";
import ProjectCreateTourGuide from "@/src/components/utils/ProjectsCreateTourGuide";
import { useState } from "react";

interface Project {
  id: number;
  nome: string;
  descricao: string;
  publico: boolean;
  status: number;
  estimativaValor: number;
}

export function ProjectsList({ proj }: { proj: Project[] }) {
  const [startTour, setStartTour] = useState(true);

  const handleTourEnd = () => {
    setStartTour(false);
  };

  return (
    <div>
      {/* <ProjectCard proj={proj}/> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 relative">
        {startTour && (
          <div className="absolute w-full">
            <ProjectCreateTourGuide
              start={startTour}
              setStartTour={setStartTour}
              onTourEnd={handleTourEnd}
            />
          </div>
        )}
        {proj.map((project, index) => (
          <div key={index} id={`pcard-${index + 1}`}>
            <ProjectCard proj={project} />
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 right-0 mb-10 mr-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="bg-custom-green text-black font-bold hover:text-white"
              id="proj-2"
            >
              Adicionar Projeto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto bg-white shadow-lg p-6">
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
    </div>
  );
}
