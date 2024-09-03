// src/utils/Global.js
import { Buffer } from "buffer";

class Global {
    // Propriedades estáticas para URLs da API
    static Api = "https://apibrite.azurewebsites.net/api";
    //static MinApi = "https://localhost:7142/minapi";
    static MinApi = "https://minimalapibrite.azurewebsites.net/minapi";
  
    // Método estático para adicionar cabeçalhos à requisição HTTP
    static async addHeaders(client, localStorage, parameters = {}) {
      try {
        const savedToken = await Global.readLocalStorage(localStorage, "tokenUsuario");
  
        // Verificação adicional: garantir que o token não é nulo
        if (!savedToken || savedToken === "tokenUsuario") {
          throw new Error("Token JWT não encontrado no localStorage");
        }
        console.log(savedToken);

        if (!client.defaults.headers) {
          client.defaults.headers = {};
        }

        if (!client.defaults.headers["Authorization"]) {
          client.defaults.headers["Authorization"] = `Bearer ${savedToken}`;
        }
  
        const claimValue = Global.getClaimFromToken(savedToken, "http://schemas.customclaims.com/hash");
  
        if (claimValue && !client.defaults.headers["tenant"]) {
          client.defaults.headers["tenant"] = claimValue;
        }
  
        for (const [key, value] of Object.entries(parameters)) {
          client.defaults.headers[key] = value;
          // if (!client.headers.has(key)) {
          //   client.headers.append(key, value);
          // } else {
          //   client.headers.delete(key);
          //   client.headers.append(key, value);
          // }
        }
  
        return true;
      } catch (error) {
        console.error(error.message);
        return false;
      }
    }
  
    // Método estático para ler do localStorage
    static async readLocalStorage(localStorage, item) {
      try {
        const savedToken = await localStorage.getItem(item);
        return savedToken ?? item;
      } catch (error) {
        console.error("Erro ao ler do localStorage:", error);
        return null;
      }
    } 
  
    // Método estático para obter uma claim do token JWT
    static getClaimFromToken(token, claimType) {
      try {

        // Verifica se o token é válido e se é uma string
        if (!token || typeof token !== 'string') {
          throw new Error("Token inválido ou indefinido");
        }

        // Divide o token e verifica se está no formato JWT válido (contendo três partes)
        const parts = token.split('.');
        if (parts.length !== 3) {
          throw new Error("Token JWT não está no formato correto");
        }

        const base64Payload = parts[1];

        if (!base64Payload) {
          throw new Error("Payload do token indefinido");
        }
        
        // const decodePayload = Buffer.from(base64Payload, 'based64').toString('uft-8');

        let decodedPayload;
        if (typeof Buffer !== 'undefined') {
          // Para Node.js
          decodedPayload = Buffer.from(base64Payload, 'base64').toString('utf-8');
        } else {
          // Para o navegador
          decodedPayload = atob(base64Payload);
        }

        const jwtToken = JSON.parse(decodedPayload);

        return jwtToken[claimType] || null;
      //   const jwtToken = JSON.parse(atob(token.split('.')[1]));
      //   return jwtToken[claimType] || null;
      // } catch (error) {
      //   console.error("Erro ao obter claim do token:", error);
      //   return null;
      // }
    } catch (error) {
      console.error("Error ao obter claim ao token:", error);
      return null;
    }
  }
  
    // Método estático para verificar a expiração do token
    static async verificaExpiracaoLogin(token = "", localStorage = null) {
      if (!token) {
        token = await Global.readLocalStorage(localStorage, "tokenUsuario");
      }
  
      if (token === "tokenUsuario") {
        return true;
      }
  
      const expiredDataStr = Global.getClaimFromToken(token, "exp");
      let expiredDataLong;
  
      if (!expiredDataStr) {
        return true;
      }
  
      // Converte o timestamp para DateTime
      expiredDataLong = parseInt(expiredDataStr, 10);
  
      // Obtém o timestamp atual
      const timestampAtual = Math.floor(Date.now() / 1000);
  
      // Compara as datas de expiração
      return timestampAtual > expiredDataLong;
    }
  }
  
  export default Global;
  