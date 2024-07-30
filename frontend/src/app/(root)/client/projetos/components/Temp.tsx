import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

interface Project {
  nome: string;
  descricao: string;
  publico: boolean;
}

export function ProjectsList({ proj }: { proj: Project[] }) {
  return (
    <div className="grid grid-cols-4">
      {proj.map((project, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{project?.nome}</CardTitle>
            <CardDescription>{project?.descricao}</CardDescription>
            {/*Isso aqui ta responsivo, caso queira colcoar mais dados, verifiquei no meu bando de dados e os dados relevantes que vamos pedir no cadastro é o nome e a descrição,mas podem ser definidos outros*/}
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
