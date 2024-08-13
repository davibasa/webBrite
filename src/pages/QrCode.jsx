import { React, useEffect, useState } from 'react';
import io from "socket.io-client";
import { QRCode } from "react-qr-code";
import { FaRegCircleCheck } from "react-icons/fa6";

const socket = io.connect("https://whatsappapiserver-w1rr.onrender.com", {});

const QrCode = () => {

  const [session, setSession] = useState("");
  const [ qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const createSessionForWhatsapp = () => {
    setIsLoading(true);
    socket.emit("createSession", {
      id:session,
    });
  };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9_]*$/;
    e.preventDefault();
    if (regex.test(value)) {
      setSession(value);
      setError("");
    } else {
      setError("Somente letras, números e underline são permitidos.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    // Aqui você pode adicionar o código que deseja executar quando o Enter for pressionado
    console.log("Formulário submetido, mas sem redirecionamento");
  };

  const [id, setId] = useState('');

  useEffect(() => {
    socket.emit("connected", "Hello from client");
    socket.on("qr", (data) => {
      const { qr } = data; 
      console.log("QR RECEIVED", qr)
      setQrCode(qr);  // Atualiza o estado do QR code com o valor recebido
      setIsLoading(false);  // Para o loading
    })
    
    socket.on("ready", (data) => {
      console.log(data);
      const {id} = data;
      setId(id);
    })

    socket.on('allChats', (data) => {
      console.log("allChats", data)
    })

    socket.on('message', (data) => {
      console.log('message', data)
    })
    socket.on('error', function (data) {
      console.log(data || 'error');
    });

    socket.on('connect_failed', function (data) {
      console.log(data || 'connect_failed');
    });
  }, 
  []
);

  
  const getAllChats = () => {
    socket.emit('getAllChats', { id });

  }
  return (
    <div className='w-full bg-gradient-to-br from-white to-gray-200 md:px-36 py-10 flex items-center justify-center'>
      <div className='md:max-w-[1400px] grid lg:grid-cols-2 m-auto max-w-[520px] lg:gap-44'>
        <div className="flex flex-col justify-center lg:justify-start">
          <h1 className='text-4xl md:text-6xl font-bold text-center md:text-left'>Experimente a <span className='text-brite'>Tecnologia Inovadora </span> da <span className='text-brite'>Brite</span> Agora!</h1>
          <h2 className='md:w-[500px] py-6 md:py-8 md:text-lg font-semibold text-gray-400 text-center md:text-left'>Abra o Whatsapp e escaneie o QR code e veja como nossa solução de IA automatiza o suporte ao paciente e os agendamentos via WhatsApp.</h2>
          
          <div className="flex items-center ml-2 md:ml-0 gap-4">
            <form onSubmit={handleSubmit} method="POST" className='shadow-xl'>
                <div className='flex-col'>
                  <input
                    id="text"
                    name="text"
                    type="text"
                    value={session}
                    onChange={handleInputChange}
                    required
                    placeholder='Ex de sessão: Clínica_1'
                    autoComplete="text"
                    className={`block form-input w-full md:px-16 rounded-md border-0 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none ${error ? 'border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500' : 'ring-gray-300 focus:ring-to-brite'}`}
                  />
                  {/* Exibe a mensagem de erro, se houver */}
                  {error && (
                    <p className="text-red-500 text-sm mt-2 absolute">
                      {error}
                    </p>
                  )}                  
                </div>
            </form>

            <button 
              onClick={createSessionForWhatsapp}
              disabled={isLoading || !session}
              className={`border bg-brite animated-background hover:bg-gradient-to-r hover:from-[#6363EF] hover:via-indigo-400 hover:to-indigo-600 focus:outline-none
              text-white shadow-2xl rounded-lg px-6 py-2 text-sm md:text-base hover:border-transparent font-semibold active:bg-indigo-950 active:text-gray-200 ${isLoading || !session ? 'opacity-45 cursor-not-allowed' : ''}`}>
              {isLoading ? 'Carregando...' : 'Gerar QrCode'}
            </button>

          </div>
        </div>

        <div className='flex justify-center py-8 md:py-0'>
          <div className='bg-white w-[340px] md:w-[400px] flex flex-col justify-center items-center rounded-xl p-4 shadow-2xl'>
            {isLoading ? (
              <div className='flex justify-center items-center py-10'>
                <div className='h-52 w-52 border-8 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-brite animate-spin ease-linear rounded-full'></div>
              </div>
            ): (
              <>
              <div className='hidden md:flex rounded-xl px-3 md:px-6 py-12 md:py-10'
                  style={{
                    background: 'linear-gradient(65deg, rgba(99,99,239,1) 0%, rgba(99,99,239,0.5954714649531687) 64%)',
                  }}>
                  <QRCode 
                    value={qrCode}
                    fgColor={qrCode ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)"} // QR code in white with 75% opacity
                    bgColor="transparent" // Transparent background
                    size={320} // Size of the QR code
                    level="H" // Error correction level
                  />
              </div>
              <div className='md:hidden rounded-xl px-3 md:px-6 py-12 md:py-10'
                  style={{
                    background: 'linear-gradient(65deg, rgba(99,99,239,1) 0%, rgba(99,99,239,0.5954714649531687) 64%)',
                  }}>
                  <QRCode 
                    value={qrCode}
                    fgColor={qrCode ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)"} // QR code in white with 75% opacity
                    bgColor="transparent" // Transparent background
                    size={280} // Size of the QR code
                    level="H" // Error correction level
                  />
              </div>
              </>
            )}

            <div>
              {id !== '' ? (
                <div className='flex items-center gap-2'>
                  <FaRegCircleCheck 
                    size={30}
                    style={{color: '#6363EF'}}
                  />
                  <h1 className='text-xl md:text-4xl text-center font-bold text-brite py-4'>Conectado</h1>
                </div>
              ) : (
                <>
                <h1 className='pt-6 font-bold md:text-lg text-center'>Transforme o Atendimento ao Paciente escaneando o QrCode Acima</h1>
                <p className='text-gray-400 text-sm md:text-base font-semibold text-center py-2'>Clique no Botão e Tenha acesso a automatição do agendamento, relátorios e mais</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrCode
