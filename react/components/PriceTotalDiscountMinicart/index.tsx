import React from "react";
//@ts-ignore
import { OrderForm } from "vtex.order-manager";
//@ts-ignore
import styles from "./PriceTotalDiscountMinicart.css";


function PriceTotalDiscountMinicart() {
    const valueDiscountPix = 0.05;
    const { useOrderForm } = OrderForm;
    const OrderFormContext = useOrderForm();
    const totalValue = OrderFormContext.orderForm.totalizers[0]?.value;

    const discountValue = totalValue * valueDiscountPix;

    const finalValue = totalValue - discountValue;

    function formatCurrency(value: number) {
        const valor = value / 100;
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }


    return (
        <div className={styles.PriceTotalDiscountMinicartItem}>
            ou <strong>{formatCurrency(finalValue)}</strong> à vista no PIX
        </div>
    );

}



export default PriceTotalDiscountMinicart;
