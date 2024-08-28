"use client";
import { AuthContext } from "@/src/context/authContext";
import {
  useContext,
  useEffect,
  useState,
  useRef,
  FormEventHandler,
  FormEvent,
} from "react";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/src/components/ui/dialog";
import { CirclePlus } from "lucide-react";

import { createProjeto, getProjects } from "../../data/request";

export function ProjectList() {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [publico, setPublico] = useState(false);

  interface Project {
    id: string;
    nome: string;
    descricao: string;
    publico: boolean;
  }

  const dialogTriggerRef = useRef<HTMLButtonElement>(null);

  const openDialog = () => {
    if (dialogTriggerRef.current) {
      dialogTriggerRef.current.click();
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchProjects = async () => {
      const data = await getProjects(user);
      setProjects(data);
    };

    fetchProjects();
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const projeto = {
      nome: nome,
      descricao: descricao,
      publico: publico,
      clienteId: user?.cliente?.id,
    };
    const resposta = await createProjeto(projeto);

    console.log(resposta);
  };

  return (
    <div>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Projetoss</h1>
        <Button
          onClick={openDialog}
          size="icon"
          variant="secondary"
          className="rounded-full text-custom-green bg-transparent"
        >
          <CirclePlus className="w-6 h-6" />
        </Button>
      </div>
      <div className="flex flex-1">
        {projects.length > 0 ? (
          <div className="flex-1 grid grid-cols-1 gap-4 ">
            {projects.map((project: Project, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{project?.nome}</CardTitle>
                  <CardDescription>{project?.descricao}</CardDescription>
                  {/*Isso aqui ta responsivo, caso queira colcoar mais dados, verifiquei no meu bando de dados e os dados relevantes que vamos pedir no cadastro é o nome e a descrição,mas podem ser definidos outros*/}
                </CardHeader>
              </Card>
            ))}
            <div className="fixed bottom-0 right-0 mb-10 mr-10">
              <Button
                onClick={openDialog}
                className="bg-custom-green text-black font-bold hover:text-white"
              >
                Adicionar Projeto
              </Button>
            </div>
            <div className="fixed bottom-0 right-0 mb-10 mr-10">
              <Dialog>
                <DialogTrigger asChild>
                  <Button ref={dialogTriggerRef} className="sr-only">
                    Adicionar Projeto
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto p-6 rounded-lg bg-white shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">
                      Cadastre seu projeto
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground">
                      Cadastre as informações do seu projeto aqui.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                    <div className="grid gap-4">
                      <label className="block text-lg font-medium">
                        Nome do projeto
                        <Input
                          className="border  rounded-md shadow-sm w-full px-3 py-2 focus-visible:ring-custom-green focus:border-custom-green"
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="grid gap-4">
                      <Label className="block text-lg font-medium">
                        Descrição do projeto
                        <Textarea
                          placeholder="Escreva sua descrição."
                          className="border rounded-md shadow-sm w-full px-3 py-2 focus-visible:ring-custom-green focus:border-custom-green"
                          onChange={(e) => setDescricao(e.target.value)}
                        />
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            className="w-5 h-5 border-gray-300 rounded checked:bg-custom-green checked:border-transparent focus:ring-custom-green"
                            checked={publico}
                            onCheckedChange={(checked) =>
                              setPublico(checked as boolean)
                            }
                          />
                          <Label>
                            <span title="Restringe a visibilidade de seu projeto">
                              Privado
                            </span>
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                      <DialogClose>
                        <Button
                          type="button"
                          variant="secondary"
                          className="py-2 px-4 text-base "
                        >
                          Fechar
                        </Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        className="py-2 px-4 text-base bg-custom-green text-black hover:text-white"
                      >
                        Salvar
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          //Apartir daqui é quando não tem projetos
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                Você não tem projetos
              </h3>
              <p className="text-sm text-muted-foreground">
                Cadastre sua demanda em nosso sistema, nós cuidamos do resto.
              </p>
              <Button
                onClick={openDialog}
                className="bg-custom-green text-black font-bold hover:text-white"
              >
                Adicionar Projeto
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button ref={dialogTriggerRef} className="sr-only">
                    Adicionar Projeto
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg sm:max-h-[80vh] overflow-y-auto p-6 rounded-lg bg-white shadow-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">
                      Cadastre seu projeto
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground">
                      Cadastre as informações do seu projeto aqui.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="grid gap-6 py-4">
                    <div className="grid gap-4">
                      <label className="block text-lg font-medium">
                        Nome do projeto
                      </label>
                      <Input
                        id="name"
                        name="name"
                        className="border  rounded-md shadow-sm w-full px-3 py-2 focus-visible:ring-custom-green focus:border-custom-green"
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-4">
                      <Label className="block text-lg font-medium">
                        Descrição do projeto
                      </Label>
                      <Textarea
                        placeholder="Escreva sua descrição."
                        id="description"
                        className="border rounded-md shadow-sm w-full px-3 py-2 focus-visible:ring-custom-green focus:border-custom-green"
                        onChange={(e) => setDescricao(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        id="privado"
                        type="checkbox"
                        className="w-5 h-5 border-gray-300 rounded checked:bg-custom-green checked:border-transparent focus:ring-custom-green"
                        onChange={(e) => setPublico(e.target.checked)}
                      />
                      <Label
                        className="text-base"
                        title="As informações só poderão ser acessadas com sua permissão"
                      >
                        Privado
                      </Label>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                      <DialogClose>
                        <Button
                          type="button"
                          variant="secondary"
                          className="py-2 px-4 text-base "
                        >
                          Fechar
                        </Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        className="py-2 px-4 text-base bg-custom-green text-black hover:text-white"
                      >
                        Salvar
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
