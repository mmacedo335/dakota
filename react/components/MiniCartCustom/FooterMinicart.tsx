import React from "react";
//@ts-ignore
import { OrderForm } from "vtex.order-manager";

//@ts-ignore
import styles from "./style.css";

function FooterMiniCart() {
    const { orderForm } = OrderForm.useOrderForm();

    const totalCart = orderForm?.value ?? 0;
    const valueDiscountPix = 0.05;
    const { useOrderForm } = OrderForm;
    const OrderFormContext = useOrderForm();

    const totalValue = OrderFormContext?.orderForm?.totalizers?.[0]?.value ?? 0;
    const discountValue = totalValue * valueDiscountPix;
    const finalValue = totalValue - discountValue;

    const installmentOptions =
        OrderFormContext?.orderForm?.paymentData?.installmentOptions?.[0]?.installments ?? [];
    const quantityParcel = installmentOptions.length;

    const priceParcel = quantityParcel > 0 ? totalCart / quantityParcel : 0;

    function formatCurrency(value: number) {
        const valor = value / 100;
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor);
    }

    const hasFreteGratisElement = document.getElementById("barra_frete_texto");
    const hasFreteGratis =
        hasFreteGratisElement && hasFreteGratisElement.textContent.includes("FRETE GRÁTIS");
    const textoEntrega = hasFreteGratis ? "Grátis" : "A calcular";

    console.log(OrderFormContext);

    return (
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
