import React, { useEffect } from "react";

const SharedCart: React.FC = () => {
  async function setCookieFromBackend() {
    try {
      // Fazendo a requisição para o serviço backend
      const response = await fetch("/_v/cookie", {
        method: "POST",
      }); 

      // Verifica o status da resposta
      if (response.status === 400 || response.status === 500) {
        // Chama a função recursivamente para tentar novamente
        setCookieFromBackend(); 
      }   
    } catch (error) {
      console.error("Erro ao fazer requisição:", error);
    }
  } 

  useEffect(() => {
    setCookieFromBackend();
  }, []);

  return null;
}; 

export default SharedCart;
