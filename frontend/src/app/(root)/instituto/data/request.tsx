import { api } from "@/src/api/axios";
import { User } from "@/src/context/authContext";

export const getProjects = (user: User) => {
  const fetchData = async () => {
    try {
      const response = await api.get(
        `/projeto/instituto/${user?.instituto?.id}`
      );
      const jsonData = response.data;
      return jsonData;
    } catch (error) {
      console.error("Erro ao obter os projetos:", error);
      return [];
    }
  };

  return fetchData();
};

export async function getProposals(user: User) {
  const response = await api.get(`/propostas/institute/${user?.instituto?.id}`);

  return response.data;
}

export async function counterProposta(id: string ,counter: any) {
  const response = await api.post(`/propostas/counter/${id}`, counter);
  
  return response;
}

export async function updateStatus(id: string, status: number) {
  const response = await api.post(`/projeto/status/${id}/${status}`);

  return response;
}

export async function getTalents(){
  const response = await api.get("/talento")

  return response;
}

export async function getEquips(){
  const response = await api.get("/equipe")

  return response;
}