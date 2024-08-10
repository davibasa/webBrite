import React from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full h-screen">
      <div className="trapezoid h-[60%] absolute inset-0"></div>
      <div className="flex justify-center items-center pt-32 md:pt-14">
        <div className="relative justify-center">
          <Link to="/">
            <img className="py-4" src={logo} />
          </Link>
          <div className="bg-white w-[320px] md:w-[572px] flex flex-col justify-center shadow-2xl px-6 py-12 lg:px-8">
            <h2 className="font-bold text-2xl md:text-3xl text-center">
              Entrar na Brite
            </h2>
            <p className="text-center text-sm md:text-base text-gray-400">
              A melhor maneira de você automatizar seu atendimento
            </p>
            <div className="sm:w-full pt-6 sm:mx-auto sm:max-w-sm">
              <form action="#" method="POST" className="space-y-6">
                <div>
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

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block font-medium">
                      Senha
                    </label>
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-semibold text-brite hover:text-indigo-400"
                      >
                        Esqueceu a Senha?
                      </a>
                    </div>
                  </div>
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
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-brite px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brite-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brite"
                  >
                    Entrar
                  </button>
                </div>
              </form>

              <p className="mt-8 text-center text-sm text-gray-500">
                Não possui conta?{""}
                <Link
                  to="/register"
                  className="font-semibold leading-6 text-brite hover:text-brite-hover pl-2"
                >
                  Crie uma Conta
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
