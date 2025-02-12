import React, { useState, useEffect } from "react";
//@ts-ignore
import { OrderForm } from "vtex.order-manager";
//@ts-ignore
import styles from "./style.css";
function FooterMiniCart() {
    const { useOrderForm } = OrderForm;
    const orderFormContext = useOrderForm();
    const [totalCart, setTotalCart] = useState(0);
    const [finalValue, setFinalValue] = useState(0);
    const [priceParcel, setPriceParcel] = useState(0);
    const [quantityParcel, setQuantityParcel] = useState(0);
    const valueDiscountPix = 0.05; // 5% de desconto
    useEffect(() => {
        const totalValue = orderFormContext?.orderForm?.totalizers?.[0]?.value ?? 0;
        // Calcula o desconto do PIX
        const discountValue = totalValue * valueDiscountPix;
        const finalCalculatedValue = totalValue - discountValue;
        const installmentOptions = orderFormContext?.orderForm?.paymentData?.installmentOptions?.[0]?.installments ?? [];
        const quantity = installmentOptions.length;
        const parcelPrice = quantity > 0 ? totalValue / quantity : 0;
        setTotalCart(totalValue);
        setFinalValue(finalCalculatedValue);
        setPriceParcel(parcelPrice);
        setQuantityParcel(quantity);
        console.log('Total do carrinho:', totalValue);console.log('Valor do desconto:', discountValue);console.log('Valor final PIX:', finalCalculatedValue);
        console.log("OrderForm", orderFormContext?.orderForm);
        console.log("installmentOptions", installmentOptions);
        console.log("quantityParcel", quantity);
        console.log("priceParcel", parcelPrice);
      }, [orderFormContext]);
    const formatCurrency = (value: number): string => {
        const valor = value / 100;
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor);
    };
    const hasFreteGratisElement = document.getElementById("barra_frete_texto");
    const hasFreteGratis = hasFreteGratisElement?.textContent?.includes("FRETE GRÁTIS") ?? false;
    const textoEntrega = hasFreteGratis ? "Grátis" : "A calcular";
    return (
        <div className={styles.FooterMiniCart}>
            <div className={styles.FooterMiniCartRowSmall}>
                <span>Subtotal</span>
                <span>{formatCurrency(totalCart)}</span>
            </div>
            <div className={styles.FooterMiniCartRowSmall}>
                <span>Entrega</span>
                <span>{textoEntrega}</span>
            </div>
            <div className={styles.FooterMiniCartRow}>
                <span>Total</span>
                <span>{formatCurrency(totalCart)}</span>
            </div>
            {quantityParcel > 0 && (
                <div className={styles.FooterMiniCartInstallments}>
                    <span>
                        Em até {quantityParcel}x de {formatCurrency(priceParcel)}
                    </span>
                </div>
            )}
            <div className={styles.FooterMiniCartPriceDiscount}>
                ou <strong>{formatCurrency(finalValue)}</strong> à vista no PIX
            </div>
        </div>
    );
}
export default FooterMiniCart;
