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
    const valueDiscountPix = 0.03; // 3% de desconto

    useEffect(() => {

        if (!orderFormContext?.orderForm?.items?.length) return;

        const items = orderFormContext.orderForm.items.map((item: any) => ({
            id: item.id,
            quantity: item.quantity,
            seller: "1"
        }));

        console.log('itens asasasasa',items)

        fetch("/api/checkout/pub/orderForms/simulation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({ items })
        })
        .then((response) => response.json())
        .then((data) => {
               const installmentOptions = data?.paymentData?.installmentOptions.find(
                (option) => option?.paymentName === "Visa"
              )?.installments;
                 const quantity = installmentOptions.length;
                 const parcelPrice = installmentOptions?.[installmentOptions.length -1].value
                 setPriceParcel(parcelPrice);
                 setQuantityParcel(quantity);
            console.log("Simulação do carrinho:", installmentOptions);
            console.log("Simulação do carrinho:", data);
        })
        .catch((error) => console.error("Erro ao simular o carrinho:", error));

        const totalValue = orderFormContext?.orderForm?.totalizers?.[0]?.value ?? 0;
        const discountValue = totalValue * valueDiscountPix;
        const finalCalculatedValue = totalValue - discountValue;

        setTotalCart(totalValue);
        setFinalValue(finalCalculatedValue);
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
                        Em até {quantityParcel} x de {formatCurrency(priceParcel)}
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
