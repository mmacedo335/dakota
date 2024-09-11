import React, { useEffect } from "react";
import { OrderForm } from "vtex.order-manager";

const SharedCart: React.FC = () => {
  const currentLocation = window.location.pathname;
  const { useOrderForm } = OrderForm;
  const { setOrderForm } = useOrderForm();

  // Função para definir o cookie a partir do backend com limite de tentativas
  async function setCookieFromBackend(retries = 5) {
    try {
      const response = await fetch("/_v/cookie", {
        method: "POST",
      });

      if (response.status === 404 || response.status === 500) {
        // Tentar novamente até esgotar o número de tentativas
        if (retries > 0) {
          setTimeout(() => setCookieFromBackend(retries - 1), 1000);
        } else {
          console.error("Falha ao definir cookie após várias tentativas.");
        }
      } else if (response.status === 200) {
        let data = await response.json();
        const id = data?.cookieValueCustom?.replace("__ofid=", "");
        setOrderForm({ id });
      }
    } catch (error) {
      console.error("Erro ao fazer requisição:", error);
    }
  }

  // Função para limpar o cookie a partir do backend com limite de tentativas
  async function setCookieClearFromBackend(retries = 5) {
    try {
      const response = await fetch("/_v/cookieclear", {
        method: "POST",
      });

      if (response.status === 404 || response.status === 500) {
        // Tentar novamente até esgotar o número de tentativas
        if (retries > 0) {
          setTimeout(() => setCookieClearFromBackend(retries - 1), 1000);
        } else {
          console.error("Falha ao limpar cookie após várias tentativas.");
        }
      }
    } catch (error) {
      console.error("Erro ao limpar cookie:", error);
    }
  }

  useEffect(() => {
    // Função para realizar as ações de cookies
    const handleCookieActions = async () => {
      if (currentLocation === "/checkout/orderPlaced/") {
        await setCookieClearFromBackend();
      } else {
        await setCookieFromBackend();
      }
    };

    // Adicionando um listener para garantir que a lógica só seja executada após a página estar totalmente carregada
    const onLoadHandler = () => {
      handleCookieActions();
    };

    // Garantindo que a lógica só execute quando a página estiver carregada
    if (document.readyState === "complete") {
      // Se a página já estiver carregada, executa imediatamente
      onLoadHandler();
    } else {
      // Caso contrário, espera o evento de load
      window.addEventListener("load", onLoadHandler);
    }

    // Remover o listener no cleanup
    return () => {
      window.removeEventListener("load", onLoadHandler);
    };
  }, [currentLocation]);

  return null;
};

export default SharedCart;
