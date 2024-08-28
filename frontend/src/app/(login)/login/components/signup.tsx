import { useContext, useState } from "react";
import Logo from "./gcidLogo";
import RadioButtonGroup from "./radioUser";
import { AuthContext } from "@/src/context/authContext";
import Link from "next/link";

interface SignUpPageProps {
  changeToLogin: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ changeToLogin }) => {
  const { signUp } = useContext(AuthContext); // Obtém a função de login do AuthContext
  const [email, setEmail] = useState(""); // Alterei para 'identifier' para representar tanto o email quanto o username
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [selectedOption, setSelectedOption] = useState<string>("1");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    let userType = selectedOption === "1" ? 1 : selectedOption === "2" ? 2 : 3;
    // Envia os dados para o contexto de autenticação
    signUp({ username, email, password, userType }); // Aqui assumimos que o contexto de autenticação tem uma função de login que aceita um objeto com 'identifier' e 'password'
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Cadastre-se
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div className="grid place-items-center">
              <div className="grid w-full grid-cols-3 gap-2 rounded-xl bg-gray-200 p-1">
                <div>
                  <input
                    type="radio"
                    name="option"
                    id="1"
                    value="1"
                    className="peer hidden"
                    checked={selectedOption === "1"}
                    onChange={handleOptionChange}
                  />
                  <label
                    htmlFor="1"
                    className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:transition peer-checked:ease-in peer-checked:bg-custom-green peer-checked:font-bold peer-checked:text-white"
                  >
                    Cliente
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="option"
                    id="2"
                    value="2"
                    className="peer hidden"
                    checked={selectedOption === "2"}
                    onChange={handleOptionChange}
                  />
                  <label
                    htmlFor="2"
                    className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:transition peer-checked:ease-in peer-checked:bg-custom-green peer-checked:font-bold peer-checked:text-white"
                  >
                    Instituto
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="option"
                    id="3"
                    value="3"
                    className="peer hidden"
                    checked={selectedOption === "3"}
                    onChange={handleOptionChange}
                  />
                  <label
                    htmlFor="3"
                    className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:transition peer-checked:ease-in peer-checked:bg-custom-green peer-checked:font-bold peer-checked:text-white"
                  >
                    Talento
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="exemplo@mail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nome de Usuário
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="username"
                  placeholder="Digite seu nome de usuário"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gradient-to-r from-custom-blue to-custom-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cadastrar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Já faz parte da nossa comunidade?{" "}
            <button
              onClick={changeToLogin}
              className="font-semibold leading-6 text-custom-green hover:text-custom-blue"
            >
              Entre aqui
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
