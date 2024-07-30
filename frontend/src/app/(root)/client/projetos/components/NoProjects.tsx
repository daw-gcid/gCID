import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { FormCreateProject } from "./FormCreateProject";

export function NoProjects() {
  return (
    <div className="flex items-center justify-center min-h-[calc(83vh-2rem)] p-4 border border-dashed">
      <div className="flex items-center justify-center w-full max-w-lg rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold tracking-tight text-gray-800 mb-4">
            Você não tem projetos
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Cadastre sua demanda em nosso sistema, nós cuidamos do resto.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-custom-green text-black font-bold hover:text-white">
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
    </div>
  );
}
