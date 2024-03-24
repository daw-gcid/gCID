import React, { useState, useContext } from 'react';
import Logo from '../../../components/gcidLogo'

const SigninClientPage: React.FC = () => {
	const [cnpj, setCnpj] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');

	const handleRegisterClient = (event: React.FormEvent) => {
		event.preventDefault(); // Previne o comportamento padrão do formulário

		// registerClient({ cnpj, companyName, phone, address }); // Aqui assumimos que o contexto de autenticação tem uma função de login que aceita um objeto com 'identifier' e 'password'
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<div className='flex justify-center'>
						<Logo />
					</div>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Complete seu Cadastro
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleRegisterClient}>
						<div>
							<label htmlFor="cnpj" className="block text-sm font-medium leading-6 text-gray-900">
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
							<label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
								Razão Social
							</label>
							<div className="mt-2">
								<input
									id="companyName"
									name="companyName"
									type="text"
									placeholder="Digite a razão social de sua empresa"
									required
									value={companyName}
									onChange={(e) => setCompanyName(e.target.value)}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
								Telefone
							</label>
							<div className="mt-2">
								<input
									id="phone"
									name="phone"
									type="text"
									placeholder="Digite seu Telefone"
									required
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-custom-blue sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
								Endereço
							</label>
							<div className="mt-2">
								<input
									id="address"
									name="address"
									type="text"
									placeholder="Digite o endereço de sua empresa"
									required
									value={address}
									onChange={(e) => setAddress(e.target.value)}
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
	)
}

export default SigninClientPage;
