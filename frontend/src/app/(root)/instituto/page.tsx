"use client";
import { toast } from "react-toastify";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "@/src/context/authContext";

interface Projeto {
  id: string;
  nome: string;
  descricao: string;
  status: number;
  dtFim: string;
  dtCadastro: string;
  dtAtualizacao: string;
  feedback: string;
  dtFeedback: string;
  publico: boolean;
  dtInicio: string;
}

export default function InstitutoPage() {
  const { user } = useContext(AuthContext);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/projeto`)
        .then((response) => {
          setProjetos(response.data);
          setLoading(false);
        })
        .catch((error: AxiosError) => {
          setError(error.message);
          setLoading(false);
          toast.error("Erro ao carregar projetos");
        });
    }
  }, [user]);

  const dialogTriggerRef = useRef<HTMLButtonElement>(null);

  if (!user) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    // Falta a parte de salvar os dados no bd
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
      <div className="flex flex-col">
        <div className="flex-1 overflow-hidden px-4 py-2">
          {loading ? (
            <div>Carregando...</div>
          ) : error ? (
            <div>{error}</div>
          ) : projetos.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projetos.map((projeto) => (
                <Card key={projeto.id}>
                  <CardHeader>
                    <CardTitle>{projeto.nome}</CardTitle>
                    <CardDescription>{projeto.descricao}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col">
                      <span>Status: {projeto.status}</span>
                      <span>
                        Data de Início:{" "}
                        {new Date(projeto.dtInicio).toLocaleDateString()}
                      </span>
                      <span>
                        Data de Fim:{" "}
                        {new Date(projeto.dtFim).toLocaleDateString()}
                      </span>
                      <span>Feedback: {projeto.feedback}</span>
                      <span>
                        Data do Feedback:{" "}
                        {new Date(projeto.dtFeedback).toLocaleDateString()}
                      </span>
                      <span>
                        Visibilidade: {projeto.publico ? "Público" : "Privado"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-lg">
              Você não tem projetos cadastrados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
