import React, { useEffect, useState } from 'react'
// @ts-ignore
import styles from './styles.css'
import { useProduct } from 'vtex.product-context'

const UltimasUnidades = () => {
    const productContext = useProduct()
    const product = productContext?.selectedItem

    const [availableQty, setAvailableQty] = useState<number | null>(null)

    useEffect(() => {
        const qty = product?.sellers?.[0]?.commertialOffer?.AvailableQuantity

        if (qty !== undefined) {
            setAvailableQty(qty)
        }
    }, [product])

    return (
        <>
            {availableQty !== null && availableQty < 3 && (
                <div className={styles.ultimasUnidades}>
                    <span className={styles.ultimas}>últimas unidades</span>
                    <span className={styles.disponível}>
                        {availableQty === 1
                            ? 'Resta 1 item em estoque'
                            : `Restam ${availableQty} itens em estoque`}
                    </span>

                </div>
            )}
        </>
    )
}

export default UltimasUnidades
