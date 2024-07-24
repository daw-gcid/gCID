import { api } from "@/src/api/axios";

export function getProjetos(id: string) {
  let response;
  api
    .get(`/projeto/cliente/${id}`)
    .then((res) => (response = res))
    .catch((e) => (response = e));

  return response;
}

export async function createProjeto(projeto: any) {
  const response = await api.post("/projeto", projeto);

  return response;
}
