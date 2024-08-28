import { motion } from 'framer-motion';
import HomeLogo from './HomeLogo';


export default function Herohome() {
  const transition = {
    duration: 2,
    ease: [0.6, -0.05, 0.01, 0.99],
  };


  return (
    <div className="relative isolate overflow-hidden bg-white">
      <motion.img
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        src="./img_amazon.jpg"
        alt="Imagem representativa do fundo do site"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right xsm:object-center md:object-center lg:mt-0"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        className="relative isolate px-6 pt-14 h-screen xsm:pt-10 lg:px-8"
      >
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="mx-auto max-w-2xl pb-32 pt-6 h-screen sm:pb-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center flex flex-col justify-evenly h-full items-center">
            <HomeLogo />
            <h1
              className="text-4xl font-bold tracking-tight text-custom-blue mt-2 sm:text-6xl"
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
            >
              A inovação começa aqui
            </h1>

            <p className="mt-6 text-lg leading-8 text-white font-mono bg-opacity-75 bg-green-700">
              <span className=" p-4 rounded font-semibold">
              Conectamos as melhores equipes de talentos com institutos de ponta para transformar suas ideias em realidade.
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

