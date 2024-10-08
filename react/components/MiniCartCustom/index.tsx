import React, { useEffect, useState, useCallback } from "react";
import { OrderForm } from "vtex.order-manager";
import "./style.css";

// Definindo a interface para os itens do carrinho
interface CartItem {
  id: string;
  name: string;
  detailUrl: string;
  imageUrl: string;
  quantity: number;
}

// Definindo a interface para a estrutura de dados do OrderForm
interface OrderFormData {
  items: CartItem[];
}

const MiniCartCustom: React.FC = () => {
  const [data, setData] = useState<OrderFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderFormId, setOrderFormId] = useState<string | null>(null); // Estado para salvar o orderFormId
  const { useOrderForm } = OrderForm;
  const { orderForm } = useOrderForm();

  // Atualiza o orderFormId quando estiver disponível
  useEffect(() => {
    if (orderForm?.id && orderForm.id !== "default-order-form") {
      setOrderFormId(orderForm.id);
    }
  }, [orderForm?.id]);

  // Função para buscar os dados do minicart
  const dadosMinicart = async () => {
    if (!orderFormId) return; // Certifica-se de que o orderFormId está definido

    try {
      const response = await fetch(`/api/checkout/pub/orderForm/${orderFormId}`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Erro ao buscar dados do minicart");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Erro ao fazer requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar a quantidade de itens no carrinho
  const updateCartItemQuantity = useCallback(
    async (index: number) => {
      if (!data || index < 0 || index >= data.items.length || !orderFormId) {
        console.error("Índice inválido ao tentar atualizar o item");
        return;
      }

      let bodyContent = JSON.stringify({
        orderItems: [{ quantity: 0, index: index }],
      });

      try {
        const response = await fetch(
          `/api/checkout/pub/orderForm/${orderFormId}/items/update`,
          {
            method: "POST",
            body: bodyContent,
          }
        );

        if (response.status === 200) {
          dadosMinicart();
        }
      } catch (error) {
        console.error("Erro ao atualizar o item:", error);
      }
    },
    [data, orderFormId] // Agora depende do orderFormId
  );

  // Efeito para carregar os dados do minicart e atualizar quando o orderForm mudar
  useEffect(() => {
    if (orderFormId) {
      dadosMinicart();
    }
  }, [orderFormId, orderForm]); // Atualiza sempre que o orderForm mudar

  // Indicador de carregamento
  if (loading) {
    return (
      <div className="minicart-custom">
        <div className="empty">
          <p>
            Seu carrinho está vazio! <br /> Que tal conferir as{" "}
            <br /> novidades da coleção.
          </p>
          <a href="/">Vem ver</a>
        </div>
      </div>
    );
  }

  // Renderização do minicart
  return (
    <>
      <div className="quantity">
        <a href="/checkout/#/cart">
          {data?.items.length}
        </a>
      </div>
      <div className="minicart-custom">
        {data?.items.length === 0 ? (
          <div className="empty">
            <p>
              Seu carrinho está vazio! <br /> Que tal conferir as{" "}
              <br /> novidades da coleção.
            </p>
            <a href="/">Vem ver</a>
          </div>
        ) : (
          <>
            <div className="products">
              {data?.items.map((item, index) => (
                <div className="item" key={index}>
                  <div className="name">
                    <a href={item.detailUrl}>{item.name}</a>
                  </div>
                  <div className="img">
                    <a href={item.detailUrl}>
                      <img
                        src={item.imageUrl}
                        width="50px"
                        height="50px"
                        alt={item.name}
                      />
                    </a>
                  </div>
                  <div
                    onClick={() => updateCartItemQuantity(index)}
                    className="remove"
                  ></div>
                </div>
              ))}
            </div>
            <div className="finalizar">
              <a href="/checkout/#/cart">Finalizar compra</a>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MiniCartCustom;
