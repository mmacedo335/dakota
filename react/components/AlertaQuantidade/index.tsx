import React from "react";
//@ts-ignore
import { useProduct } from "vtex.product-context";
//@ts-ignore
import styles from "./style.css";

const AlertaQuantidade: React.FC = () => {

    const productContextValue = useProduct();
    const availableQuantity = productContextValue?.selectedItem?.sellers?.[0]?.commertialOffer?.AvailableQuantity ?? 0;
    const collectionMessagemUrgencia = productContextValue?.product?.productClusters?.some(item => item.id === "252");

    if (collectionMessagemUrgencia && availableQuantity > 0 && availableQuantity < 4) {
        if (availableQuantity === 3) {
            return (
                <div className={styles.alertaQuantidade}>
                    Restam 3 unidades
                </div>
            )
        } else if (availableQuantity === 2) {
            return (
                <div className={styles.alertaQuantidade}>
                    Restam 2 unidades
                </div>
            )
        } else {
            return (
                <div className={styles.alertaQuantidade}>
                    Resta 1 unidade
                </div>
            )
        }
    } else {
        return null;
    }


};

export default AlertaQuantidade;
