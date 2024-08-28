import React from 'react';
import Link from 'next/link';

function Contact() {

  return (
    <div className="flex justify-center items-center flex-col ">
      <br/>
      
      <h1 className="text-center text-5xl px-3">
        Entre em <span className="font-semibold text-custom-green">Contato</span>{' '}
      </h1>
      <p className=" pt-6 text-xl md:mx-40 mx-10 text-center text-black">
        Entre em contato conosco para saber mais sobre como podemos ajudar a sua empresa
        <br />
        a encontrar os parceiros ideais para o desenvolvimento de projetos de P&D.
      </p>
      <div className="flex justify-center items-center gap-10 w-3/4">
        <Link href="#">
          <div className="group md:w-72 w-80 h-12 rounded-md my-10 cursor-pointer flex justify-center items-center hover:shadow-lg border border-custom-blue hover:bg-custom-blue">
            <h1 className="text-custom-blue group-hover:text-white text-base">
              Saiba Mais
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Contact;
