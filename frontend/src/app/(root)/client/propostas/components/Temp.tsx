
import * as React from "react";
import { PropostasCard } from "./ProjectCard";

interface Project {
  nome: string;
  descricao: string;
  publico: boolean;
  status: number;
}


export function PropostasList({ proj }: { proj: Project[] }) {

  return (

    <div>
      {/* <ProjectCard proj={proj}/> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {proj.map((project, index) => (
          <PropostasCard proj={project} key={index} />
        ))}
      </div>
    </div>
  )
    ;
}