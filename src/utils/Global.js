// src/utils/Global.js

class Global {
    // Propriedades estáticas para URLs da API
    static Api = "";
    static MinApi = "https://localhost:7142/minapi";
    // static MinApi = "https://minimalapiteko.azurewebsites.net/minapi";
  
    // Método estático para adicionar cabeçalhos à requisição HTTP
    static async addHeaders(client, localStorage, parameters = {}) {
      try {
        const savedToken = await Global.readLocalStorage(localStorage, "JwtToken");
  
        if (!client.headers.has("Authorization")) {
          client.headers.append("Authorization", `Bearer ${savedToken}`);
        }
  
        const claimValue = Global.getClaimFromToken(savedToken, "http://schemas.customclaims.com/hash");
  
        if (claimValue && !client.headers.has("tenant")) {
          client.headers.append("tenant", claimValue);
        }
  
        for (const [key, value] of Object.entries(parameters)) {
          if (!client.headers.has(key)) {
            client.headers.append(key, value);
          } else {
            client.headers.delete(key);
            client.headers.append(key, value);
          }
        }
  
        return true;
      } catch (error) {
        console.error(error.message);
        return false;
      }
    }
  
    // Método estático para ler do localStorage
    static async readLocalStorage(localStorage, item) {
      const savedToken = await localStorage.getItem(item);
      return savedToken ?? item;
    }
  
    // Método estático para obter uma claim do token JWT
    static getClaimFromToken(token, claimType) {
      try {
        const jwtToken = JSON.parse(atob(token.split('.')[1]));
        return jwtToken[claimType] || null;
      } catch (error) {
        console.error("Erro ao obter claim do token:", error);
        return null;
      }
    }
  
    // Método estático para verificar a expiração do token
    static async verificaExpiracaoLogin(token = "", localStorage = null) {
      if (!token) {
        token = await Global.readLocalStorage(localStorage, "JwtToken");
      }
  
      if (token === "JwtToken") {
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
  