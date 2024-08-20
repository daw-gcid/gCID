import { Proposta } from "./ComponentsManager";
import { PropostasCard } from "./PropostaCard";

export function PropostasList({ proj }: { proj: Proposta[] }) {

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