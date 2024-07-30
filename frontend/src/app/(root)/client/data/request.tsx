import { api } from "@/src/api/axios";
import { User } from "@/src/context/authContext";

export const GetProjects = (user: User) => {
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

export default GetProjects;

export async function createProjeto(projeto: any) {

  const response = await api.post("/projeto", projeto);

  return response;
}
