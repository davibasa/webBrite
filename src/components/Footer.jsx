import React from 'react';
import { logo_blue } from "../assets";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='w-full bg-gradient-to-br from-gray-100 to-gray-200 border-t-2 border-gray-200'>
        <div className='md:max-w-[1400px] m-auto grid md:grid-cols-3 gap-8 md:gap-16 max-w-[520px] px-4 pt-8 '>
            <img src={logo_blue} className='h-[40px] flex justify-start'/>
                    {/* <div className="ml-2 md:ml-0">
                        <h3 className="text-xl font-semibold">Empresa</h3>
                        <ul className="py-4 text-gray-400">
                            <li className="py-1">Sobre nós</li>
                            <li className="py-1">Blog</li>
                            <li className="py-1">Contato</li>
                        </ul>
                    </div>
                    <div className="ml-2 md:ml-0">
                        <h3 className="text-xl font-semibold">Produto</h3>
                        <ul className="py-4 text-gray-400">
                            <li className="py-1">Home</li>
                            <li className="py-1">Planos</li>
                            <li className="py-1">Soluções</li>
                        </ul>
                    </div> */}
            <div className="ml-2 md:ml-6">
                <h3 className="text-xl font-semibold">Entre em Contato</h3>
                <h3 className="py-3 text-gray-400">Telefone: +55 (62) 99517-0434</h3>
            </div>
            <div className='ml-2 md:ml-6'>
                <h3 className="py-3 text-gray-400">Email: paivabrasill@gmail.com</h3>
                <div className="py-3 md:pl-10 flex gap-4">
                    <FaFacebook size={20} />
                    <FaInstagram size={20} />
                    <FaLinkedin size={20} />
                    <FaTwitter size={20} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
