import React from "react";
import backgroundLamp from "../../public/background-lamp.png";

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: '#010d1b',
    }} className="h-screen">
      <div id="main-image" className="h-screen" style={{
        backgroundImage: `url(${backgroundLamp.src})`, backgroundPosition: '50vw 0', backgroundRepeat: 'no-repeat',
      }}>
        <header style={{ backgroundColor: 'linear-gradient(rgba(0, 0, 0, 0.658), rgba(0, 0, 0, 0))' }}
          className="fixed w-full">
          <div id="header-background"></div>
          <div id="header-content" className="px-12 py-8 flex justify-between">
            <div className="flex gap-4">
              <h1 className="">
                gCID
              </h1>
              <a href="#" className="text-gray-300 transition-all ease-in duration-75 hover:text-white">Como funciona?</a>
              <a href="#" className="text-gray-300 transition-all ease-in duration-75 hover:text-white">Soluções</a>
              <a href="#" className="text-gray-300 transition-all ease-in duration-75 hover:text-white">Preços</a>
            </div>
            <div className="flex gap-4">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br group-hover:to-blue-500 hover:text-white text-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-100 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-gray-300 hover:text-white dark:bg-opacity-0 rounded-md group-hover:bg-opacity-0">
                  Entrar
                </span>
              </button>
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Saiba mais
                </span>
              </button>
            </div>
          </div>
        </header>

        <div className="container pt-5 px-32">
          <h1 style={{ marginTop: '40vh', fontSize: '3rem', fontWeight: 'bold' }}>A inovação começa a partir daqui</h1>
          <p className="text-gray-400">Encontramos a melhor equipe de desenvolvimento com<br />o melhor instituto para a sua melhor ideia</p>
        </div>
      </div>
    </div>
  );
}
