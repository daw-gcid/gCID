import React from "react";

export function PropostasListSkeleton() {
  const SkeletonCard = () => (
    <div className="bg-gray-200 animate-pulse h-24 mb-4 rounded-md shadow-sm"></div>
  );

  return (
    <div className="flex h-full space-x-4">
      {/* Coluna Enviado */}
      <div className="flex-none w-80 bg-blue-100 p-4 rounded-md shadow-md flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-4 text-blue-800">Recebido</h2>
        <div className="flex-1 overflow-y-auto">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>

      {/* Coluna Respondido */}
      <div className="flex-none w-80 bg-green-100 p-4 rounded-md shadow-md flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-4 text-green-800">Respondido</h2>
        <div className="flex-1 overflow-y-auto">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>

      {/* Coluna Aceito */}
      <div className="flex-none w-80 bg-yellow-100 p-4 rounded-md shadow-md flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-4 text-yellow-800">Aceito</h2>
        <div className="flex-1 overflow-y-auto">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>

      {/* Coluna Recusado */}
      <div className="flex-none w-80 bg-red-100 p-4 rounded-md shadow-md flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-4 text-red-800">Recusado</h2>
        <div className="flex-1 overflow-y-auto">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}
