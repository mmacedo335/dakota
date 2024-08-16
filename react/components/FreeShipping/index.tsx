import React from "react";
//@ts-ignore
import { OrderForm } from "vtex.order-manager";
//@ts-ignore
import styles from "./FreeShipping.css";

function FreeShipping() {
  const valueFrete = 20000;
  const { useOrderForm } = OrderForm;
  const OrderFormContext = useOrderForm();
  const totalValue = OrderFormContext.orderForm.totalizers[0]?.value;
  const valorFrete = Number(valueFrete);
  const calculateBar = ((totalValue / valorFrete) * 100).toFixed(2);
  var dynamicWidth = "" + calculateBar + "%";
  var realValor = ((valorFrete - totalValue) / 100).toFixed(2);
  var RealNovo = realValor.split(".");

  if (totalValue < valorFrete) {
    var fretetexto =
      `Quase lá, faltam <strong>${RealNovo}</strong> para o <strong>Frete Grátis</strong>`; 
  } else {
    var fretetexto = "Parabéns! Você ganhou <strong>FRETE GRÁTIS!</strong>";
  }

  return (
    <div className={styles.freeShippingItem}>
      <div
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
}

export default FreeShipping;
