import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppointmentInput = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPopupMessage(null);

    try {
      // Verifica se todos os campos estão preenchidos
      if (!name || !email || !number) {
        throw new Error("Preencha todos os campos obrigatórios.");
      }

      // Autentica a empresa com o CNPJ
      //   const resultadoEmpresa = await logarEmpresa(cnpj);
      //   console.log(resultadoEmpresa);

      // Verifica o sucesso da autenticação da empresa
      //   if (!resultadoEmpresa.success) {
      //     throw new Error(resultadoEmpresa?.message || "Erro ao logar empresa.");
      //   }

      console.log(email);
      // Autentica o usuário com email e senha
      //   const resultadoUsuario = await logarUsuario(
      //     { user: email, password: password },
      //     resultadoEmpresa.data
      //   );

      //   // Verifica o sucesso da autenticação do usuário
      //   if (!resultadoUsuario.success) {
      //     throw new Error(resultadoUsuario?.message || "Erro ao logar usuário.");
      //   }

      //   // Armazena tokens de autenticação em localStorage
      //   localStorage.setItem("tokenEmpresa", resultadoEmpresa.data); // Token da empresa
      //   localStorage.setItem("tokenUsuario", resultadoUsuario.data); // Token do usuário

      // Redireciona para a página home após o login bem-sucedido
      //   navigate("/home");
    } catch (error) {
      // Verifica se é um erro de rede
      if (error.name === "TypeError") {
        console.log("t1");
        setPopupMessage(
          "Erro de conexão. Verifique sua internet e tente novamente."
        );
      } else {
        console.log("t2");
        console.log(error);
        // Exibe mensagens de erro mais detalhadas
        setPopupMessage(
          error.message || "Erro inesperado. Por favor, tente novamente."
        );
      }
    } finally {
      // Garante que o estado de loading seja atualizado, mesmo em caso de erro
      setLoading(false);
    }
  };
  return (
    <div className="w-full pt-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="md:grid md:grid-cols-6 gap-4">
          <div className="md:col-span-3 col-span-full">
            <label htmlFor="name" className="block font-bold">
              Nome
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="md:col-span-3 col-span-full py-4 md:py-0">
            <label htmlFor="email" className="block font-bold">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="md:col-span-3 col-span-full">
            <label htmlFor="phone" className="block font-bold">
              Número
            </label>
            <div className="mt-2">
              <input
                id="number"
                name="number"
                type="text"
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                autoComplete="current-number"
                className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              />
            </div>
          </div>

          <div className="md:col-span-6 col-span-full py-4 md:py-0">
            <p className="font-bold">
              Compartilhe qualquer coisa que possa <br /> ser útil para melhor
              experiência da consulta
            </p>
            <div className="mt-2 px-4 mb-4 rounded-md rounded-t-md border-2 border-gray-200">
              <textarea
                id="comment"
                rows="3"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Anote aqui..."
              ></textarea>
            </div>
          </div>
        </div>

        {popupMessage && (
          <div className="text-red-500 text-sm text-center">{popupMessage}</div>
        )}
      </form>
      <div className="flex items-center gap-4 justify-center">
        <button
          type="submit"
          className="border px-8 md:px-20 py-2 bg-brite animated-background hover:bg-gradient-to-r hover:from-[#6363EF] hover:via-indigo-400 hover:to-indigo-600 focus:outline-none
            text-white shadow-lg rounded-2xl  text-sm md:text-base hover:border-transparent font-semibold active:text-gray-300"
        >
          Agendar Consulta
        </button>
      </div>
    </div>
  );
};

export default AppointmentInput;
