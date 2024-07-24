"use client";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "@/src/context/authContext";

import { createProjeto, getProjetos } from "./data/request";

export default function Dashboard() {
  const { logout, user } = useContext(AuthContext);
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

  if (!user) {
    return null;
  }

  const handleSubmit = () => {
    const projeto = {
      nome: nome,
      descricao: descricao,
      publico: publico,
      clienteId: user.id,
      institutoId: "",
    };
    const resposta = createProjeto(projeto);

    console.log(resposta);
  };

  return (
    <div>teste</div>
  );
}
