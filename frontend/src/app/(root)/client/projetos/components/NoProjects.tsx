import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { FormCreateProject } from "./FormCreateProject";

export function NoProjects() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Você não tem projetos
        </h3>
        <p className="text-sm text-muted-foreground">
          Cadastre sua demanda em nosso sistema, nós cuidamos do resto.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-custom-green text-black font-bold hover:text-white">
              Adicionar Projeto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto bg-white shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Cadastre seu projeto
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
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
