import { api } from "@/src/api/axios";
import { User } from "@/src/context/authContext";

const GetProjects = (user : User) => {
  const fetchData = async () => {

    try {
      const response = await api.get(`/projects/${user?.cliente?.id}`);
      const jsonData = response.data;
      return jsonData;
    } catch (error) {
      console.error('Erro ao obter os projetos:', error);
      return [];
    }
  };

  return fetchData();
};

export default GetProjects;
