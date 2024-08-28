
import React, { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaRegEnvelope } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import NavLogo from './NavLogo';

function Footer() {
  const currentYear = new Date().getFullYear();


  return (
    <>
      <div className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-4">
        <div className="p-1 ">
          <ul>
            <p className="text-green-600 font-bold text-3xl pb-6">
            <NavLogo />
            </p>
            <div className="flex gap-6 pb-5">
              <FaInstagram
                className="text-2xl cursor-pointer hover:text-pink-600"
              />
              <FaFacebook
                className="text-2xl cursor-pointer hover:text-blue-600"
                
              />
              <FaLinkedin
                className="text-2xl cursor-pointer hover:text-blue-600"
                
              />
              <FaYoutube
                className="text-2xl cursor-pointer hover:text-red-600"
                
              />
            </div>
          </ul>
        </div>
        <div>
          <ul>
            <p className="text-custom-green font-bold text-2xl pb-4">
              Informações
            </p>
            <a
              href="https://www.bing.com/maps?osid=669e9e47-e6ad-4fd6-8d51-63685ea81461&cp=-3.134699~-60.015414&lvl=17&pi=0&imgid=9792ddd2-d593-4b49-90d8-ea4158d4f65e&v=2&sV=2&form=S00027"
              target="_blank"
              className="flex items-center text-gray-500 text-md pb-2 font-semibold hover:text-green-600 cursor-pointer"
            >
              <FaMapMarkerAlt className="text-2xl cursor-pointer hover:text-green-600 mr-2" />
              <span>
              Avenida Sete de Setembro, 1975, Manaus, AM, 69020-120
              </span>
            </a>
            <a
              href="mailto:informacoes@gcid.com.br"
              target="_blank"
              className="flex items-center text-gray-500 text-md pb-2 font-semibold hover:text-green-600 cursor-pointer"
            >
              <FaRegEnvelope className="text-2xl cursor-pointer hover:text-green-600 mr-2" />
              <span>informacoes@gcid.com.br</span>
            </a>
            <a
              href="tel:(92) 984597088"
              target="_blank"
              className="flex items-center text-gray-500 text-md pb-2 font-semibold hover:text-green-600 cursor-pointer"
            >
              <FaPhoneAlt className="text-2xl cursor-pointer hover:text-green-600 mr-2" />
              <span>(92) 98459-7088</span>
            </a>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center p-5 bg-gray-50">
        <h1 className="text-gray-800 font-semibold">
          Copyright ® {currentYear} Gcid - Todos os direitos reservados.
        </h1>
      </div>
    </>
  );
}

export default Footer;

