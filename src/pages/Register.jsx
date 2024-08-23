import React from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="w-full h-screen">
      <div className="trapezoid h-[60%] absolute inset-0"></div>
      <div className="flex justify-center items-center pt-32 md:pt-14">
        <div className="relative justify-center">
          <Link to="/">
            <img className="py-4" src={logo} />
          </Link>
          <div className="bg-white w-[320px] md:w-[700px] justify-center shadow-2xl px-6 py-12 lg:px-8">
            <h2 className="font-bold text-2xl md:text-3xl text-center">
              Crie sua Conta na Brite
            </h2>
            <p className="text-center text-sm md:text-base text-gray-400">
              A melhor maneira de você automatizar seu atendimento
            </p>
            <div className="pt-6">
              <form action="#" method="POST" className="space-y-3">
                <div className="gap-x-6 gap-y-6 md:grid md:grid-cols-6">
                  <div className="md:col-span-3 col-span-ful">
                    <label htmlFor="first-name" className="block font-medium">
                      Primeiro Nome
                    </label>
                    <div className="mt-2">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        required
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3 col-span-full py-5 md:py-0">
                    <label htmlFor="last-name" className="block font-medium">
                      Último Nome
                    </label>
                    <div className="mt-2">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        required
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-4 col-span-full">
                    <label htmlFor="email" className="block font-medium">
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full py-5 md:py-0">
                    <label htmlFor="password" className="block font-medium">
                      Senha
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="password" className="block font-medium">
                      Confirmar Senha
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                      />
                    </div>
                  </div>

                  <div className="col-span-full py-6 md:pt-4">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-brite px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brite-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brite"
                    >
                      Criar Conta
                    </button>
                  </div>
                </div>
              </form>

              <p className="text-center text-sm text-gray-500">
                Já possui Conta?{""}
                <Link
                  to="/"
                  className="font-semibold leading-6 text-brite hover:text-brite-hover pl-2"
                >
                  Entrar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
