import React, { useMemo } from "react";
//@ts-ignore
import { OrderForm } from "vtex.order-manager";
//@ts-ignore
import styles from "./FreeShipping.css";

interface FreeShippingProps {
  valor: string;
  ativo: boolean;
}

const FreeShipping = React.memo(({ valor, ativo }: FreeShippingProps) => {
  const { useOrderForm } = OrderForm;
  const orderFormContext = useOrderForm();
  
  if (!ativo) {
    return null;
  }

  const calculations = useMemo(() => {
    const totalValue = orderFormContext.orderForm.totalizers[0]?.value || 0;
    const valorFrete = Number(valor) || 0;
    
    if (valorFrete <= 0) {
      return null;
    }

    const progressPercentage = Math.min((totalValue / valorFrete) * 100, 100);
    const dynamicWidth = `${progressPercentage.toFixed(2)}%`;
    const remainingValue = Math.max(valorFrete - totalValue, 0);
    const formattedRemainingValue = (remainingValue / 100).toFixed(2);
    const valueParts = formattedRemainingValue.split(".");

    const isEligibleForFreeShipping = totalValue >= valorFrete;
    const freetextMessage = isEligibleForFreeShipping
      ? "Parabéns! Você ganhou <strong>FRETE GRÁTIS!</strong>"
      : `Quase lá, faltam <strong>${valueParts}</strong> para o <strong>Frete Grátis</strong>`;

    return {
      dynamicWidth,
      freetextMessage
    };
  }, [orderFormContext.orderForm.totalizers, valor]);

  if (!calculations) {
    return null;
  }

  const { dynamicWidth, freetextMessage } = calculations;

  return (
    <div className={styles.freeShippingItem}>
      <div
        id="barra_frete_texto"
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: freetextMessage }}
      />
      <div className={styles.freeShippingBar}>
        <div
          className={styles.freeShippingRange}
          style={{ width: dynamicWidth }}
        />
      </div>
    </div>
  );
});

// Add displayName for debugging
FreeShipping.displayName = 'FreeShipping';

// Add schema to the component
(FreeShipping as any).schema = {
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
};

export default FreeShipping;
