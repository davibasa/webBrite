import React, { useState } from "react";
import { logo } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { logarEmpresa, logarUsuario } from "../services/authService"; // Importando os serviços

const Login = () => {
  const [cnpj, setCnpj] = useState(""); // Adicionando o estado do CNPJ
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPopupMessage(null);

    try {
      // Verifica se todos os campos estão preenchidos
      if (!cnpj || !email || !password) {
        throw new Error("Preencha todos os campos obrigatórios.");
      }

      // Autentica a empresa com o CNPJ
      const resultadoEmpresa = await logarEmpresa(cnpj);
      console.log(resultadoEmpresa);

      // Verifica o sucesso da autenticação da empresa
      if (!resultadoEmpresa.success) {
        throw new Error(resultadoEmpresa?.message || "Erro ao logar empresa.");
      }

      console.log(email)
      // Autentica o usuário com email e senha
      const resultadoUsuario = await logarUsuario({ 'user': email,  'password': password }, resultadoEmpresa.data);

      // Verifica o sucesso da autenticação do usuário
      if (!resultadoUsuario.success) {
        throw new Error(resultadoUsuario?.message || "Erro ao logar usuário.");
      }

      // Armazena tokens de autenticação em localStorage
      localStorage.setItem("tokenEmpresa", resultadoEmpresa.data); // Token da empresa
      localStorage.setItem("tokenUsuario", resultadoUsuario.data); // Token do usuário

      // Redireciona para a página home após o login bem-sucedido
      navigate("/home");
    } catch (error) {
      // Verifica se é um erro de rede
      if (error.name === "TypeError") {
        console.log("t1");  
        setPopupMessage("Erro de conexão. Verifique sua internet e tente novamente.");
      } else {
        console.log("t2");
        console.log(error);
        // Exibe mensagens de erro mais detalhadas
        setPopupMessage(error.message || "Erro inesperado. Por favor, tente novamente.");
      }
    } finally {
      // Garante que o estado de loading seja atualizado, mesmo em caso de erro
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="trapezoid h-[60%] absolute inset-0"></div>
      <div className="flex justify-center items-center pt-32 md:pt-14">
        <div className="relative justify-center">
          <Link to="/">
            <img className="py-4" src={logo} alt="Logo" />
          </Link>
          <div className="bg-white w-[320px] md:w-[572px] flex flex-col justify-center shadow-2xl px-6 py-12 lg:px-8">
            <h2 className="font-bold text-2xl md:text-3xl text-center">
              Entrar na Brite
            </h2>
            <p className="text-center text-sm md:text-base text-gray-400">
              A melhor maneira de você automatizar seu atendimento
            </p>
            <div className="sm:w-full pt-6 sm:mx-auto sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="cnpj" className="block font-medium">
                    CNPJ
                  </label>
                  <div className="mt-2">
                    <input
                      id="cnpj"
                      name="cnpj"
                      type="text"
                      required
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
                      autoComplete="cnpj"
                      placeholder="Digite seu CNPJ"
                      className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block font-medium">
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                    />
                  </div>
                </div>

                {popupMessage && (
                  <div className="text-red-500 text-sm text-center">
                    {popupMessage}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center rounded-md bg-brite px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brite-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brite"
                  >
                    {loading ? "Entrando..." : "Entrar"}
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
