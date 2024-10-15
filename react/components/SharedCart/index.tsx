import React, { useEffect } from "react";
import { OrderForm } from "vtex.order-manager";

const SharedCart: React.FC = () => {
  const currentLocation = window.location.pathname;
  const { useOrderForm } = OrderForm;
  const { setOrderForm } = useOrderForm();

  // Função para definir o cookie a partir do backend
  async function setCookieFromBackend(retries = 3) {
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

  // Função para limpar o cookie a partir do backend
  async function setCookieClearFromBackend(retries = 3) {
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

    const handleCookieActions = async () => {
      if (currentLocation === "/checkout/orderPlaced/") {
        await setCookieClearFromBackend();
      } else {
        await setCookieFromBackend();
      }
    };

    let executionCount = 0;
    const intervalId = setInterval(() => {
      if (executionCount < 3) {
        handleCookieActions();
        executionCount++;
      } else {
        clearInterval(intervalId);
      }
    }, 3000);

    return () => clearInterval(intervalId);

  }, []);


  return null;

};

export default SharedCart;
