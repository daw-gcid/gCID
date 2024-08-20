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

export async function acceptProposal(id: string) {
  const response = await api.post(`/propostas/accept/${id}`);

  return response;
}
