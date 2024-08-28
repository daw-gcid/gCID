import { Proposta } from "./ComponentsManager";
import { AceitoCard, RecebidoCard } from "./PropostaCard";

export function PropostasList({ proj }: { proj: Proposta[] }) {
  // Filtra as propostas com base no estado
  const enviados = proj.filter((p) => p.status === 0);
  const respondidos = proj.filter((p) => p.status === 1);
  const aceitos = proj.filter((p) => p.status === 2);
  const recusados = proj.filter((p) => p.status === 3);

  return (
    <div className="flex h-full space-x-4">
      {/* Coluna Enviado */}
      <div className="flex-none w-80 bg-blue-100 p-4 rounded-md shadow-md flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-4 text-blue-800">Recebido</h2>
        <div className="flex-1 overflow-y-auto">
          {enviados.length === 0 && (
            <p className="text-gray-500">Nenhuma proposta Recebida.</p>
          )}
          {enviados.map((p, index) => (
            <RecebidoCard proposta={p} key={index} />
          ))}
        </div>
      </div>

      {/* Coluna Respondido */}
      <div className="flex-none w-80   bg-yellow-100 p-4 rounded-md shadow-md flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-4 text-yellow-800">
          Respondido
        </h2>
        <div className="flex-1 overflow-y-auto">
          {respondidos.length === 0 && (
            <p className="text-gray-500">Nenhuma proposta Respondida.</p>
          )}
          {respondidos.map((p, index) => (
            <AceitoCard proposta={p} key={index} />
          ))}
        </div>
      </div>

      {/* Coluna Aceito */}
      <div className="flex-none w-80 bg-green-100 p-4 rounded-md shadow-md flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-4 text-green-800 ">Aceito</h2>
        <div className="flex-1 overflow-y-auto">
          {aceitos.length === 0 && (
            <p className="text-gray-500">Nenhuma proposta aceita.</p>
          )}
          {aceitos.map((p, index) => (
            <AceitoCard proposta={p} key={index} />
          ))}
        </div>
      </div>

      {/* Coluna Recusado */}
      <div className="flex-none w-80 bg-red-100 p-4 rounded-md shadow-md flex flex-col h-full">
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
