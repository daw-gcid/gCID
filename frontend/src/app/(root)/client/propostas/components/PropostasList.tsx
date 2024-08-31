import { useState } from "react";
import { Proposta } from "./ComponentsManager";
import {
  AceitoCard,
  EnviadoCard,
  RecusadoCard,
  RespondidoCard,
} from "./PropostaCard";
import ProposalTourGuide from "@/src/components/utils/ProposalTourGuide";

export function PropostasList({ proj }: { proj: Proposta[] }) {
  // Filtra as propostas com base no estado
  const enviados = proj.filter((p) => p.status === 0);
  const respondidos = proj.filter((p) => p.status === 1);
  const aceitos = proj.filter((p) => p.status === 2);
  const recusados = proj.filter((p) => p.status === 3);

  const [startTour, setStartTour] = useState(true);

  const handleTourEnd = () => {
    setStartTour(false);
  };

  return (
    <div className="flex h-full space-x-4 relative" id="prop-1">
      {startTour && (
        <div className="absolute w-full">
          <ProposalTourGuide
            start={startTour}
            setStartTour={setStartTour}
            onTourEnd={handleTourEnd}
          />
        </div>
      )}

      {/* Coluna Enviado */}
      <div
        className="flex-none w-80 bg-blue-100 p-4 rounded-md shadow-md flex flex-col h-full"
        id="prop-2"
      >
        <h2 className="text-lg font-semibold mb-4 text-blue-800">Enviado</h2>
        <div className="flex-1 overflow-y-auto">
          {enviados.length === 0 && (
            <p className="text-gray-500">Nenhuma proposta enviada.</p>
          )}
          {enviados.map((p, index) => (
            <>
              <EnviadoCard proposta={p} key={index} />
              <br />
            </>
          ))}
        </div>
      </div>

      {/* Coluna Respondido */}
      <div
        className="flex-none w-80 bg-yellow-100 p-4 rounded-md shadow-md flex flex-col h-full"
        id="prop-3"
      >
        <h2 className="text-lg font-semibold mb-4 text-yellow-800">
          Respondido
        </h2>
        <div className="flex-1 overflow-y-auto">
          {respondidos.length === 0 && (
            <p className="text-gray-500">Nenhuma proposta respondida.</p>
          )}
          {respondidos.map((p, index) => (
            <>
              <RespondidoCard proposta={p} key={index} />
              <br />
            </>
          ))}
        </div>
      </div>

      {/* Coluna Aceito */}
      <div
        className="flex-none w-80 bg-green-100  p-4 rounded-md shadow-md flex flex-col h-full"
        id="prop-4"
      >
        <h2 className="text-lg font-semibold mb-4 text-green-800">Aceito</h2>
        <div className="flex-1 overflow-y-auto">
          {aceitos.length === 0 && (
            <p className="text-gray-500">Nenhuma proposta aceita.</p>
          )}
          {aceitos.map((p, index) => (
            <>
              <AceitoCard proposta={p} key={index} />
              <br />
            </>
          ))}
        </div>
      </div>

      {/* Coluna Recusado */}
      <div
        className="flex-none w-80 bg-red-100 p-4 rounded-md shadow-md flex flex-col h-full"
        id="prop-5"
      >
        <h2 className="text-lg font-semibold mb-4 text-red-800">Recusado</h2>
        <div className="flex-1 overflow-y-auto">
          {recusados.length === 0 && (
            <p className="text-gray-500">Nenhuma proposta recusada.</p>
          )}
          {recusados.map((p, index) => (
            <AceitoCard proposta={p} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
