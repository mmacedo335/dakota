import React, { useEffect } from "react";

const SharedCart: React.FC = () => {
  const currentLocation = window.location.pathname;

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

  async function setCookieClearFromBackend() {
    try {
      // Fazendo a requisição para o serviço backend
      const response = await fetch("/_v/cookieclear", {
        method: "POST",
      });

      // Verifica o status da resposta
      if (response.status === 400 || response.status === 500) {
        // Chama a função recursivamente para tentar novamente
        setCookieClearFromBackend();
      }
    } catch (error) {
      console.error("Erro ao fazer requisição:", error);
    }
  }

  useEffect(() => {
    if (currentLocation === "/checkout/orderPlaced/") {
      setCookieClearFromBackend();
    } else {
      setCookieFromBackend();
    }
  }, []);

  return null; 
};

export default SharedCart;
