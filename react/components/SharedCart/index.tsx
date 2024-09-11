import React, { useEffect } from "react";
import { OrderForm } from "vtex.order-manager";

const SharedCart: React.FC = () => {
  const currentLocation = window.location.pathname;
  const { useOrderForm } = OrderForm;
  const { setOrderForm } = useOrderForm();

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
      } else if (response.status === 200) {
        let data = await response.json();
        const id = data?.cookieValueCustom?.replace("__ofid=", "");
        setOrderForm({
          id: id,
        });
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
