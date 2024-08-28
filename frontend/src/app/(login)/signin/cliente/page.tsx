"use client";
import React, { useState, useContext } from "react";
import Logo from "../../../../components/gcidLogo";
import { AuthContext } from "@/src/context/authContext";
import { api } from "@/src/api/axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";


const SigninClientPage: React.FC = () => {
  const [cnpj, setCnpj] = useState("");
  const [nome, setnome] = useState("");
  const [telefone, settelefone] = useState("");
  const [endereco, setendereco] = useState("");

  const { user } = useContext(AuthContext);
	if (!user) {
		return null;
	}

const handleRegisterClient = async (event: React.FormEvent) => {
	event.preventDefault(); // Previne o comportamento padrão do formulário
	const email = user.email;
	const userId = user.id;
	const clienteDto = {
		cnpj,
		nome,
		telefone,
		endereco,
		userId,
		email,
	};
	try {
		const response = await api.post("/cliente", clienteDto);
		toast.success("Cliente cadastrado com sucesso!");
		// console.log(response);
		window.location.href = "/client/projetos"; // Redireciona para a página inicial
	} catch (error) {
		const err = error as AxiosError;
		toast.error((err.response?.data as { message: string })?.message);
	}
};

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Complete seu Cadastro
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegisterClient}>
            <div>
              <label
                htmlFor="cnpj"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                CNPJ
              </label>
              <div className="mt-2">
                <input
                  id="cnpj"
                  name="cnpj"
                  type="text"
                  placeholder="Digite o número de seu CNPJ"
                  required
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Razão Social
              </label>
              <div className="mt-2">
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  placeholder="Digite a razão social de sua empresa"
                  required
                  value={nome}
                  onChange={(e) => setnome(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="telefone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Telefone
              </label>
              <div className="mt-2">
                <input
                  id="telefone"
                  name="telefone"
                  type="text"
                  placeholder="Digite seu Telefone"
                  required
                  value={telefone}
                  onChange={(e) => settelefone(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="endereco"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Endereço
              </label>
              <div className="mt-2">
                <input
                  id="endereco"
                  name="endereco"
                  type="text"
                  placeholder="Digite o endereço de sua empresa"
                  required
                  value={endereco}
                  onChange={(e) => setendereco(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-custom-blue to-custom-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SigninClientPage;
