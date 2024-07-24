import React, { useState, useContext } from 'react';
import Logo from './gcidLogo';
import RadioButtonGroup from './radioUser';
import { AuthContext } from '@/src/context/authContext';
import Link from 'next/link';

const LoginPage: React.FC<{ changeToSignUp: () => void }> = ({ changeToSignUp }) => {
  const { login } = useContext(AuthContext); // Obtém a função de login do AuthContext
  const [email, setEmail] = useState(''); // Alterei para 'identifier' para representar tanto o email quanto o username
  const [password, setPassword] = useState('');

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    // Envia os dados para o contexto de autenticação
    login({ email, password }); // Aqui assumimos que o contexto de autenticação tem uma função de login que aceita um objeto com 'identifier' e 'password'
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center mt-32 px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className='flex justify-center'>
            <Link href='/'>
            <Logo />
            </Link>
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* <RadioButtonGroup /> */}
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium leading-6 text-gray-900">
                Email ou Nome de Usuário
              </label>
              <div className="mt-2">
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  placeholder="Digite seu email ou nome de usuário"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Senha
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-custom-green hover:text-custom-blue">
                    Esqueceu a senha?
                  </a>
                </div>
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
                Entrar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Não possui uma conta? {' '}
            <button onClick={changeToSignUp} className="font-semibold leading-6 text-custom-green hover:text-custom-blue">
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage;
