"use client";
import HomeLogo from "@/src/components/HomeLogo";
import { useContext, useState } from "react";
import { AuthContext } from "@/src/context/authContext";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { api } from "@/src/api/axios";

 const SigninInstitutoPage: React.FC = () => {
  const [nome, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [telefone, setTelefone] = useState("");

  const { user } = useContext(AuthContext);
  if(!user) {
    return null;
  }

  const handleRegisterInstituto = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = user.email;
    const userId = user.id;
    const institutoDto = {
      nome,
      cnpj,
      endereco,
      cidade,
      estado,
      telefone,
      userId,
      email,
    };
    try {
      const response = await api.post("/instituto", institutoDto);
      toast.success("Instituto cadastrado com sucesso!");
      // console.log(response);
      window.location.href = "/instituto/projetos";
    } catch (error) {
      const err = error as AxiosError;
      toast.error((err.response?.data as { message: string })?.message);
    }
  };

  
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className='flex justify-center'>
            <HomeLogo />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Instituto
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegisterInstituto}>


            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Nome do Instituto
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Digite o nome do seu Instituto"
                  required
                  value={nome}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            

            <div>
              <label htmlFor="cnpj" className="block text-sm font-medium leading-6 text-gray-900">
                Cadastro Nacional da Pessoa Jurídica
              </label>
              <div className="mt-2">
                <input
                  id="cnpj"
                  name="cnpj"
                  type="text"
                  placeholder="Digite o CNPJ do seu Instituto"
                  required
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="endereco" className="block text-sm font-medium leading-6 text-gray-900">
                Endereço do Instituto
              </label>
              <div className="mt-2">
                <input
                  id="endereco"
                  name="endereco"
                  type="text"
                  placeholder="Ex.: Rua X, Nº 00, Bairro Y"
                  required
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cidade" className="block text-sm font-medium leading-6 text-gray-900">
                Cidade
              </label>
              <div className="mt-2">
                <input
                  id="cidade"
                  name="cidade"
                  type="text"
                  placeholder="Digite a cidade onde está localizado o Instituto"
                  required
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="estado" className="block text-sm font-medium leading-6 text-gray-900">
                Estado
              </label>
              <div className="mt-2">
                <input
                  id="estado"
                  name="estado"
                  type="text"
                  placeholder="Digite o estado onde está localizado o Instituto"
                  required
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-medium leading-6 text-gray-900">
                Telefone
              </label>
              <div className="mt-2">
                <input
                  id="telefone"
                  name="telefone"
                  type="text"
                  placeholder="Ex.: (00) 91234-5678"
                  required
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-custom-blue to-custom-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Finalizar cadastro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default SigninInstitutoPage;