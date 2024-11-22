import React from "react";
//@ts-ignore
import { OrderForm } from "vtex.order-manager";
//@ts-ignore
import styles from "./FreeShipping.css";

type PropsImagens = {
  valor: string,
  ativo: boolean,
}

function FreeShipping({ valor, ativo }: PropsImagens) {
  const valueFrete = valor;
  const { useOrderForm } = OrderForm;
  const OrderFormContext = useOrderForm();
  const totalValue = OrderFormContext.orderForm.totalizers[0]?.value;
  const valorFrete = Number(valueFrete);
  const calculateBar = ((totalValue / valorFrete) * 100).toFixed(2);
  var dynamicWidth = "" + calculateBar + "%";
  var realValor = ((valorFrete - totalValue) / 100).toFixed(2);
  var RealNovo = realValor.split(".");

  if (ativo === true) {
    if (totalValue < valorFrete) {
      var fretetexto =
        `Quase lá, faltam <strong>${RealNovo}</strong> para o <strong>Frete Grátis</strong>`;
    } else {
      var fretetexto = "Parabéns! Você ganhou <strong>FRETE GRÁTIS!</strong>";
    }

    return (
      <div className={styles.freeShippingItem}>
        <div
          id="barra_frete_texto"
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: fretetexto }}
        />
        <div className={styles.freeShippingBar}>
          <div
            className={styles.freeShippingRange}
            style={{ width: dynamicWidth }}
          >
          </div>
        </div>
      </div>
    );
  } else {
    return null
  }
}

FreeShipping.schema = {
  title: "Barra frete grátis",
  description: "Barra frete grátis",
  type: "object",
  properties: {
    ativo: {
      title: 'Ativo?',
      type: 'boolean',
      default: null
    },
    valor: {
      title: 'Valor frete',
      type: 'string',
      default: null
    },
  }
}

export default FreeShipping;
