import { api } from "@/src/api/axios";
import { User } from "@/src/context/authContext";

export const getProjects = (user: User) => {
  const fetchData = async () => {
    try {
      const response = await api.get(`/projeto/cliente/${user?.cliente?.id}`);
      const jsonData = response.data;
      return jsonData;
    } catch (error) {
      console.error("Erro ao obter os projetos:", error);
      return [];
    }
  };

  return fetchData();
};

export async function createProjeto(projeto: any) {
  const response = await api.post("/projeto", projeto);
  
  return response;
}

export async function updateProjeto(id: any, projeto: any) {
  const response = await api.patch(`projeto/${id}`, projeto);
  
  return response;
}

export async function deleteProjeto(id: any) {
  const response = await api.delete(`projeto/${id}`);
  
  return response;
}

export async function getProposals(user: User) {
  const response = await api.get(`/propostas/client/${user?.cliente?.id}`);

  return response.data;
}

export async function acceptProposal(id: string) {
  const response = await api.post(`/propostas/accept/${id}`);

  return response;
}

export async function getInstitutes() {
  const response = await api.get("/instituto");

  return response.data;
}

export async function createProposta(proposta: any) {
  const response = await api.post("/propostas", proposta);

  return response;
}
