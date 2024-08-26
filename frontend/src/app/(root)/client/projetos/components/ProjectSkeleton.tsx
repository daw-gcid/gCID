import { Card, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";

export function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {Array(8).fill(0).map((_, index) => (
        <Card key={index} className="p-4 border border-gray-200 shadow-sm animate-pulse">
          <div className="flex flex-col space-y-4">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-2 bg-gray-300 rounded w-2/4"></div>
            <div className="h-2 bg-gray-300 rounded w-full"></div>
            <div className="h-2 bg-gray-300 rounded w-full"></div>
            <div className="flex justify-end mt-4 w-full">
              <div className="h-4 w-4 bg-custom-green rounded-full"></div>
              <div className="h-4 w-4 bg-custom-blue rounded-full"></div>
              <div className="h-4 w-4 bg-custom-blue rounded-full"></div>
              <div className="h-4 w-4 bg-red-300 rounded-full"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
