import React from "react";
//@ts-ignore
import { OrderForm } from "vtex.order-manager";
//@ts-ignore
import { FormattedCurrency } from "vtex.format-currency";
//@ts-ignore
import styles from "./style.css";

const SummaryMinicart = () => {
  const { useOrderForm } = OrderForm;
  const orderFormContext = useOrderForm();
  const total = orderFormContext?.orderForm?.value;
  const parcelasLength =
    orderFormContext?.orderForm?.paymentData?.installmentOptions[0]
      ?.installments.length - 1;
  const count = orderFormContext?.orderForm?.paymentData?.installmentOptions[0]
    ?.installments[parcelasLength]?.count;
  const value = orderFormContext?.orderForm?.paymentData?.installmentOptions[0]
    ?.installments[parcelasLength]?.value;

  if (value != null) {
    return (
      <div className={styles.customsummary}>
        <div className={styles.titlle}>
          <span>Total</span>
        </div>
        <div>
          <div className={styles.total}>
            <span>
              <FormattedCurrency value={total / 100} /> à vista
            </span>
          </div>
          <div className={styles.parcelas}>
            <span>
              ou <b>{count}x</b> de{" "}
              <b>
                <FormattedCurrency value={value / 100} />
              </b>
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.customsummary}>
        <div className={styles.titlle}>
          <span>Total</span>
        </div>
        <div>
          <div className={styles.total}>
            <span>
              <FormattedCurrency value={total / 100} /> à vista
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default SummaryMinicart;
