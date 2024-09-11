import React, { useEffect, useState } from "react";
import { OrderForm } from "vtex.order-manager";
import "./style.css";

const MiniCartCustom: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { useOrderForm } = OrderForm;
  const { orderForm } = useOrderForm();

  async function dadosMinicart() {
    try {
      const response = await fetch(
        "/api/checkout/pub/orderForm/" + orderForm?.id + "",
        {
          method: "POST",
        },
      );

      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao fazer requisição:", error);
      setLoading(false);
    }
  }

  async function updateCartItemQuantity(index: number) {
    let bodyContent = JSON.stringify({
      "orderItems": [{ "quantity": 0, "index": index }],
    });

    try {
      const response = await fetch(
        "/api/checkout/pub/orderForm/" + orderForm?.id + "/items/update",
        {
          method: "POST",
          body: bodyContent,
        },
      );
      if (response.status === 200) {
        dadosMinicart();
      }
    } catch (error) {
      console.error("Erro ao atualizar o item:", error);
    }
  }

  useEffect(() => {
    if (orderForm?.id != "default-order-form") {
      dadosMinicart();
    }
  }, [orderForm]);

  if (loading) {
    return null;
  }

  if (!data || data?.items?.length === 0) {
    return (
      <>
        <div className="quantity">
          {data.items.length}
        </div>
        <div className="minicart-custom">
          <div className="empty">
            <p>
              Seu carrinho está vazio! <br />Que tal conferir as{" "}
              <br />novidades da coleção.
            </p>
            <a href="/">Vem ver</a>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="quantity">
          {data.items.length}
        </div>
        <div className="minicart-custom">
          <div className="products">
            {data.items.map((item: any, index: number) => (
              <div className="item" key={index}>
                <div className="name">
                  <a href={item.detailUrl}>{item.name}</a>
                </div>
                <div className="img">
                  <a href={item.detailUrl}>
                    <img src={item.imageUrl} width="50px" height="50px"></img>
                  </a>
                </div>
                <div
                  onClick={() =>
                    updateCartItemQuantity(index)}
                  className="remove"
                >
                </div>
              </div>
            ))}
            <div className="finalizar">
              <a href="/checkout/#/cart">Finalizar compra</a>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default MiniCartCustom;
