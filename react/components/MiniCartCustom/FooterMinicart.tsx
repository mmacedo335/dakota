import React, { useState, useEffect } from 'react';
//@ts-ignore
import { OrderForm } from "vtex.order-manager";

//@ts-ignore
import styles from "./style.css";


function FooterMiniCart() {
    const { orderForm } = OrderForm.useOrderForm();

    const totalCart = orderForm.value;
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

    const hasFreteGratisElement = document.getElementById("barra_frete_texto");
    const hasFreteGratis = hasFreteGratisElement && hasFreteGratisElement.textContent.includes('FRETE GRÁTIS');
    const textoEntrega = hasFreteGratis ? "Grátis" : "A calcular";

    const quantityParcel = orderForm?.paymentData?.installmentOptions?.[0]?.installments?.length ?? 1;

    const priceParcel = totalCart / quantityParcel;

    return (
        <>
            <div className={styles.FooterMiniCart}>
                <div className={styles.FooterMiniCartRowSmall}>
                    <span>Subtotal</span> <span>{formatCurrency(totalCart)}</span>
                </div>
                <div className={styles.FooterMiniCartRowSmall}>
                    <span>Entrega</span> <span>{textoEntrega}</span>
                </div>
                <div className={styles.FooterMiniCartRow}>
                    <span>Total</span> <span>{formatCurrency(totalCart)}</span>
                </div>

                <div className={styles.FooterMiniCartInstallments}>
                    <span>Em até {quantityParcel}x de {formatCurrency(priceParcel)}</span>
                </div>

                <div className={styles.FooterMiniCartPriceDiscount}>
                    ou <strong>{formatCurrency(finalValue)}</strong> à vista no PIX
                </div>
            </div>
        </>
    );
}


export default FooterMiniCart;