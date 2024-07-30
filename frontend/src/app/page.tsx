"use client";
import { useContext } from 'react'
import HomeLogo from '../components/HomeLogo'
import ImgHome from '../components/ImgHome'
import NavBar from '../components/NavBar'
import { useRouter } from 'next/navigation';

export default function Home() {

  return (
    <main className='h-full mt-16'>
      <NavBar/>
      <section className='relative flex justify-center gap-10 px-10 py-5'>
        <div className='relative bg-white w-2/5 rounded-[3rem]'>
          <div className='realtive px-2 w-full mt-16'>

            <div className='mb-3 block'>
              <HomeLogo />
            </div>

            <div className='mt-10'>
              <h1 className='text-[70px] font-semibold'>
                A inovação começa aqui
              </h1>
              <p className='text-lg'>
                Conectamos as melhores equipes de talentos com institutos de ponta para transformar suas ideias em realidade.
              </p>
            </div>

          </div>
        </div>
        <div className='relative'>
          <ImgHome/>
        </div>
      </section>
      <section className="bg-gray-100 py-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">Como Funciona</h2>
          <p className="text-lg text-gray-600">
            Nosso sistema simplifica o processo de encontrar parceiros ideais para o desenvolvimento de projetos de P&D:
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-2">1. Cadastre sua Empresa ou Instituto</h3>
              <p>
                Registre-se e crie um perfil detalhado para sua empresa ou instituto, destacando suas áreas de especialização e expertise.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-2">2. Publique suas Demandas de Projeto</h3>
              <p>
                Anuncie suas demandas de projetos de P&D e tenha acesso a uma lista de talentos qualificados e institutos interessados em colaborar.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-2">3. Conecte-se e Colabore</h3>
              <p>
                Explore perfis de talentos e institutos, inicie conversas e comece a colaborar em projetos inovadores que impulsionarão seu negócio.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
