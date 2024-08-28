"use client";

import { Button } from "@/src/components/ui/button";
import { CirclePlus } from "lucide-react";
import React, { useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([
    {
      category: "Linguagens de Programação",
      date: "24/08/2024",
      title: "Python: A Melhor Linguagem para Iniciantes?",
      description:
        "Python é frequentemente recomendada como a melhor linguagem para iniciantes, graças à sua sintaxe simples e vasta comunidade. Será que é mesmo a melhor escolha?",
      comments: [
        {
          name: "Mariana Silva",
          comment:
            "Eu comecei com Python e foi a melhor decisão. A curva de aprendizado é bem tranquila.",
        },
        {
          name: "José Almeida",
          comment:
            "Concordo, mas acho importante também aprender os conceitos por trás da linguagem.",
        },
      ],
    },
    {
      category: 'Carreira',
      date: '23 Ago 2024',
      title: 'Dicas para Quem Está Começando na Carreira de TI',
      description:
        'Entrar na área de TI pode ser intimidante, mas com as dicas certas, o caminho fica mais claro. Networking, aprendizado contínuo e um bom portfólio são essenciais.',
      comments: [
        {
          name: 'Carla Nunes',
          comment: 'Networking foi o que mais me ajudou a conseguir minha primeira oportunidade.',
        },
        {
          name: 'Pedro Santos',
          comment: 'Ter um portfólio atualizado fez toda a diferença para mim na hora de procurar emprego.',
        },
      ],
    },
    {
      category: 'Desenvolvimento Web',
      date: '22 Ago 2024',
      title: 'React vs Angular: Qual Escolher?',
      description:
        'React e Angular são duas das mais populares bibliotecas e frameworks para desenvolvimento web. Cada uma tem suas vantagens e desvantagens, qual delas você deve escolher?',
      comments: [
        {
          name: 'Lucas Ferreira',
          comment: 'Sou fã do React pela simplicidade, mas Angular é mais completo para grandes projetos.',
        },
        {
          name: 'Renata Costa',
          comment: 'Já usei ambos, mas prefiro Angular pela estrutura mais definida.',
        },
      ],
    },
    {
      category: 'Curiosidades',
      date: '21 Ago 2024',
      title: 'Como a Inteligência Artificial Está Mudando a Programação',
      description:
        'A Inteligência Artificial está revolucionando a maneira como programamos, automatizando tarefas repetitivas e ajudando a detectar erros com mais precisão.',
      comments: [
        {
          name: 'Ana Paula',
          comment: 'Estou impressionada com as novas ferramentas de IA que ajudam no desenvolvimento de código!',
        },
        {
          name: 'Ricardo Lemos',
          comment: 'Acho que ainda estamos longe de substituir programadores humanos, mas a IA com certeza está ajudando.',
        },
      ],
    },
    {
      category: 'Carreira',
      date: '20 Ago 2024',
      title: 'A Importância de Contribuir para Projetos Open Source',
      description:
        'Contribuir para projetos open source pode ser uma excelente maneira de ganhar experiência, aprender novas habilidades e se destacar no mercado de trabalho.',
      comments: [
        {
          name: 'Felipe Mendes',
          comment: 'Foi através do open source que consegui minhas primeiras conexões na indústria.',
        },
        {
          name: 'Juliana Araújo',
          comment: 'Além de ajudar na carreira, é muito gratificante ver seu código sendo usado por outras pessoas.',
        },
      ],
    },
    {
      category: 'Linguagens de Programação',
      date: '19 Ago 2024',
      title: 'Por que JavaScript Continua Dominando o Desenvolvimento Web',
      description:
        'JavaScript é uma linguagem essencial para qualquer desenvolvedor web. Sua versatilidade e vasta comunidade fazem com que continue sendo uma das linguagens mais populares.',
      comments: [
        {
          name: 'André Silva',
          comment: 'JavaScript está em todo lugar! Não tem como escapar se você quer trabalhar com web.',
        },
        {
          name: 'Laura Pereira',
          comment: 'Adoro a flexibilidade do JavaScript, mas às vezes a falta de tipagem forte complica.',
        },
      ],
    },
    {
      category: 'Tecnologia',
      date: '18 Ago 2024',
      title: 'O Futuro do Desenvolvimento Mobile com Flutter',
      description:
        'Flutter está ganhando força como uma das principais ferramentas para desenvolvimento mobile. Com suporte para Android e iOS, ele promete acelerar o processo de criação de aplicativos.',
      comments: [
        {
          name: 'Bruno Carvalho',
          comment: 'Comecei a usar Flutter recentemente e estou impressionado com a velocidade de desenvolvimento.',
        },
        {
          name: 'Isabela Ribeiro',
          comment: 'Gostei muito do Flutter, mas a curva de aprendizado é um pouco mais íngreme do que eu esperava.',
        },
      ],
    },
  ]);

  const [newPost, setNewPost] = useState({
    category: '',
    title: '',
    description: '',
    comments: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (newPost.category && newPost.title && newPost.description) {
      const currentDate = new Date().toLocaleDateString('pt-BR');
      const postToAdd = { ...newPost, date: currentDate };
      setPosts([postToAdd, ...posts]);
      setNewPost({
        category: '',
        title: '',
        description: '',
        comments: [],
      });
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="text-black body-font overflow-hidden">
  <div className="container px-5 mx-auto">
    <div className="flex items-center gap-2 mb-12">
      <h1 className="text-2xl font-semibold">Feed de Publicações</h1>
      <Button
        onClick={openModal}
        size="icon"
        variant="secondary"
        className="rounded-full text-custom-green bg-transparent"
      >
        <CirclePlus className="w-6 h-6" />
      </Button>
    </div>
    {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Criar uma Nova Publicação
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="category"
                placeholder="Categoria"
                value={newPost.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="title"
                placeholder="Título"
                value={newPost.title}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                name="description"
                placeholder="Descrição"
                value={newPost.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200 mr-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
              >
                Criar Publicação
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    <div className="-my-8 divide-y-2 divide-gray-100">
      {posts.map((post, index) => (
        <div key={index} className="py-8 flex flex-wrap md:flex-nowrap">
          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="font-semibold title-font text-gray-700">
              {post.category}
            </span>
            <span className="mt-1 text-gray-500 text-sm">{post.date}</span>
          </div>
          <div className="md:flex-grow">
            <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
              {post.title}
            </h2>
            <p className="leading-relaxed">{post.description}</p>
            <a
              href="#"
              className="text-green-600 inline-flex items-center mt-4"
            >
              Leia Mais
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <div className="mt-4">
              {post.comments.map((comment, idx) => (
                <div key={idx} className="mt-2">
                  <p className="text-gray-900">
                    <strong>{comment.name}</strong>: {comment.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  );
};

export default Home;
