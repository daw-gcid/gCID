import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export function NoProjects() {
  return (
    <div className="flex items-center justify-center min-h-[calc(83vh-2rem)] p-4 border border-dashed">
      <div className="flex items-center justify-center w-full max-w-lg rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold tracking-tight text-gray-800 mb-4">
            Você não tem projetos
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Entre em contato com algum cliente para captar algum projeto. <br />
            Acesse a aba propostas para verificar as propostas enviadas.
          </p>
          <Link href="/instituto/propostas">
            <Button className="bg-custom-green text-black font-bold hover:text-white">
              Propostas
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
